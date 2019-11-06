use rocket::{get, State, http::RawStr, response::status};
use rocket::http::Status;
use rocket::request::{Form};
use rocket_contrib::json::Json;
use serde::Deserialize;

use crate::db::{UnksoMainForums, TitanPrimary};
use crate::models;
use crate::config;
use crate::teams;
use crate::accounts;
use crate::guards::form::NaiveDateTimeForm;
use crate::accounts::file_entries;
use crate::guards::auth_guard;
use crate::teams::roles::RoleRankScope;

#[get("/")]
pub fn get_all(titan_primary: TitanPrimary) -> Result<Json<Vec<models::Organization>>, status::NotFound<String>> {
    let organizations = teams::organizations::find_all(titan_primary);

    if organizations.is_err() {
        return Err(status::NotFound("".to_string()))
    }

    Ok(Json(organizations.unwrap()))
}

#[get("/<id>", rank = 1)]
pub fn get_organization_by_id(
    id: i32,
    titan_db: TitanPrimary
) -> Result<Json<models::Organization>, status::NotFound<String>> {
    let organization = teams::organizations::find_by_id(id, &*titan_db);

    if organization.is_err() {
        return Err(status::NotFound("".to_string()));
    }

    Ok(Json(organization.unwrap()))
}

#[get("/<slug>", rank = 2)]
pub fn get_organization_by_slug(
    slug: &RawStr,
    unkso_titan: TitanPrimary
) -> Result<Json<models::Organization>, status::NotFound<String>> {
    let organization_result =
        teams::organizations::find_by_slug(slug.as_str(), &unkso_titan);

    if organization_result.is_err() {
        return Err(status::NotFound("".to_string()))
    }

    let organization = organization_result.unwrap();
    Ok(Json(organization))
}

#[get("/<org_id>/children")]
pub fn get_child_organizations(
    org_id: i32,
    titan_db: TitanPrimary
) -> Json<Vec<models::Organization>> {
    Json(teams::organizations::find_children(
        org_id, &*titan_db).unwrap())
}

/** ******************************************************************
 *  Roles/members
 ** *****************************************************************/
#[get("/<id>/users?<children>")]
pub fn get_organization_users(
    id: i32,
    children: Option<bool>,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<Vec<models::UserProfile>> {
    let include_children = children.is_some() && children.unwrap();
    let users = teams::organizations::find_users(
        id, include_children, &*titan_db).unwrap();

    Json(accounts::users::map_users_to_profile(&users, &*wcf_db, &app_config).unwrap())
}

#[derive(Deserialize)]
pub struct AddUserRequest {
    #[serde(rename(serialize = "userId", deserialize = "userId"))]
    user_id: i32,
}

/// TODO Verify CoC permissions.
#[post("/<org_id>/users", format = "application/json", data = "<user_fields>")]
pub fn add_user(
    org_id: i32,
    user_fields: Json<AddUserRequest>,
    titan_db: TitanPrimary,
) -> Json<bool> {
    let titan_db_ref = &*titan_db;
    let org_user = &models::OrganizationUser {
        organization_id: org_id,
        user_id: user_fields.user_id,
    };

    if teams::organizations::is_user_org_member(org_user, titan_db_ref) {
        return Json(true);
    }

    let res = teams::organizations::add_user(
        &org_user, titan_db_ref);
    Json(res.is_ok())
}

#[derive(Deserialize)]
pub struct RemoveUserRequest {
    #[serde(rename(serialize = "userId", deserialize = "userId"))]
    user_id: i32,
}

/// TODO Verify CoC permissions.
#[delete("/<org_id>/users", format = "application/json", data = "<user_fields>")]
pub fn remove_user(
    org_id: i32,
    user_fields: Json<RemoveUserRequest>,
    titan_db: TitanPrimary,
) -> Json<bool> {
    let titan_db_ref = &*titan_db;
    let res = teams::organizations::remove_user(&models::OrganizationUser {
        organization_id: org_id,
        user_id: user_fields.user_id,
    }, titan_db_ref);

    Json(res.is_ok())
}

#[get("/<org_id>/users/<user_id>/coc")]
pub fn get_organization_user_coc(
    org_id: i32,
    user_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<models::ChainOfCommand> {
    Json(teams::roles::find_user_coc(
        org_id, user_id, &*titan_db, &*wcf_db, app_config).unwrap())
}

#[get("/<org_id>/coc")]
pub fn get_organization_coc(
    org_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<models::ChainOfCommand> {
    Json(teams::roles::find_org_coc(
        org_id, std::i32::MAX, &*titan_db, &*wcf_db, &app_config).unwrap())
}

#[get("/<org_id>/roles?<scope>")]
pub fn list_organization_roles(
    org_id: i32,
    scope: RoleRankScope,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    _auth_user: auth_guard::AuthenticatedUser
) -> Json<Vec<models::OrganizationRoleWithAssoc>> {
    let roles = teams::roles::find_org_roles(
        org_id, scope, &*titan_db).unwrap();
    Json(teams::roles::map_roles_assoc(
        roles, &*titan_db, &*wcf_db, &app_config).unwrap())
}

/// [deprecated(note = "Use get_organization_roles instead.")]
#[get("/<org_id>/roles/unranked")]
pub fn get_organization_unranked_roles(
    org_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<Vec<models::OrganizationRoleWithAssoc>> {
    Json(teams::roles::find_unranked_roles(
        org_id, &*titan_db, &*wcf_db, &app_config).unwrap())
}

#[get("/roles/<role_id>/parent")]
pub fn get_parent_role(
    role_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<Option<models::OrganizationRoleWithAssoc>> {
    let titan_db_ref = &*titan_db;
    let parent_role_res = teams::roles::find_parent_role(
        role_id, false, titan_db_ref).unwrap();
    match parent_role_res {
        Some(parent_role) => {
            let parent_role_assoc = teams::roles::map_role_assoc(
                &parent_role, titan_db_ref, &*wcf_db, &app_config).unwrap();
            Json(Some(parent_role_assoc))
        },
        None => Json(None)
    }
}

#[derive(Deserialize)]
pub struct ReorderRolesRequest {
    #[serde(alias = "roleIds")]
    role_ids: Vec<i32>,
}

#[post("/<org_id>/roles:reorder", format = "application/json", data = "<request>")]
pub fn reorder_roles(
    org_id: i32,
    request: Json<ReorderRolesRequest>,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    auth_user: auth_guard::AuthenticatedUser
) -> Status {
    let titan_db_ref = &*titan_db;
    let is_authorized = teams::roles::is_user_in_parent_coc(
        auth_user.user.id, org_id, titan_db_ref, &*wcf_db, &app_config);

    if !is_authorized {
        return Status::Unauthorized;
    }

    let res = teams::roles::reorder_roles(
        org_id, &request.role_ids, &*titan_db);
    match res {
        Ok(_) => Status::Ok,
        _ => Status::InternalServerError,
    }
}

/** ******************************************************************
 *  Reports
 ** *****************************************************************/
#[get("/<org_id>/reports")]
pub fn list_organization_reports(
    org_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    auth_user: auth_guard::AuthenticatedUser
) -> Result<Json<Vec<models::ReportWithAssoc>>, status::BadRequest<String>> {
    let titan_db_ref = &*titan_db;
    let wcf_db_ref = &*wcf_db;
    let mut coc = teams::roles::find_org_coc(
        org_id, std::i32::MAX, titan_db_ref, wcf_db_ref, &app_config).unwrap();
    let mut roles = coc.local_coc;
    roles.append(&mut coc.extended_coc);

    for role in roles.drain(..) {
        if role.user_profile.unwrap().id == auth_user.user.id {
            let reports = if role.organization.id != org_id {
                teams::reports::find_all_by_organization(
                    org_id, titan_db_ref, &*wcf_db, &app_config)
            } else {
                teams::reports::find_all_by_org_up_to_rank(
                    org_id, role.rank.unwrap(), titan_db_ref,
                    &*wcf_db, &app_config)
            };

            return Ok(Json(reports.unwrap()));
        }
    }

    Err(status::BadRequest(Some(
        "User is not present in COC.".to_string())))
}

#[get("/reports/unacknowledged", format = "application/json")]
pub fn get_all_unacknowledged_reports(
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    auth_user: auth_guard::AuthenticatedUser
) -> Json<Vec<models::ReportWithAssoc>> {
    let titan_db_ref = &*titan_db;
    let wcf_db_ref = &*wcf_db;

    let mut roles = teams::roles::find_ranked_by_user_id(
        auth_user.user.id, titan_db_ref).unwrap();
    let mut direct_report_ids: Vec<i32> = vec!();

    for role in roles.drain(..) {
        let mut direct_reports = teams::roles::find_direct_reports(
            role.organization_id, role.rank.unwrap(), titan_db_ref, wcf_db_ref, &app_config).unwrap();
        direct_report_ids.append(&mut direct_reports.iter_mut()
            .map(|role| role.id).collect());
    }

    let reports = teams::reports::find_unacknowledged_by_role_ids(
        &direct_report_ids, titan_db_ref, wcf_db_ref, &app_config).unwrap();

    Json(reports)
}

#[derive(Deserialize)]
pub struct CreateOrganizationReportRequest {
    comments: String,
    term_start_date: chrono::NaiveDateTime,
}

#[post("/<org_id>/reports", format = "application/json", data = "<report_form>")]
pub fn create_organization_report(
    org_id: i32,
    report_form: Json<CreateOrganizationReportRequest>,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    auth_user: auth_guard::AuthenticatedUser,
) -> Result<Json<models::ReportWithAssoc>, status::BadRequest<String>> {
    let titan_db_ref = &*titan_db;
    let role = teams::roles::find_org_role_by_user_id(
        org_id, auth_user.user.id, titan_db_ref);

    match role {
        Ok(role) => {
            let new_report = models::NewReport {
                role_id: role.id,
                term_start_date: report_form.term_start_date,
                submission_date: Some(chrono::Utc::now().naive_utc()),
                comments: Some(report_form.comments.clone()),
                ack_user_id: None,
                ack_date: None,
                date_created: chrono::Utc::now().naive_utc(),
                date_modified: chrono::Utc::now().naive_utc(),
            };

            let saved_report = teams::reports::save_report(
                &new_report, titan_db_ref, &*wcf_db, &app_config);

            match saved_report {
                Ok(report) => Ok(Json(report)),
                Err(err) => Err(status::BadRequest(Some(err.to_string())))
            }
        },
        _ => {
            Err(status::BadRequest(Some(
                "Authenticated user does not have role for organization.".to_string())))
        }
    }
}

#[post("/reports/<report_id>/ack")]
pub fn ack_organization_report(
    report_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    auth_user: auth_guard::AuthenticatedUser
) -> Result<Json<models::ReportWithAssoc>, Status> {
    let titan_db_ref = &*titan_db;
    let report_res = teams::reports::find_by_id(report_id, titan_db_ref);
    match report_res {
        Ok(report) => {
            let parent_role = teams::roles::find_parent_role(
                report.role_id, false, titan_db_ref).unwrap();
            match parent_role {
                Some(role) => {
                    if role.user_id.is_none() || role.user_id.unwrap() != auth_user.user.id {
                        return Err(Status::Unauthorized)
                    }
                    let report = teams::reports::ack_report(
                        report_id, auth_user.user.id, titan_db_ref).unwrap();
                    Ok(Json(teams::reports::map_report_to_assoc(
                        report, titan_db_ref, &*wcf_db, &app_config).unwrap()))
                },
                _ => Err(Status::BadRequest)
            }
        },
        _ => Err(Status::NotFound)
    }
}

/** ******************************************************************
 *  File entries
 ** *****************************************************************/
#[derive(FromForm)]
pub struct ListOrgUserFileEntriesRequest {
    /// A string delimited list of organization Ids.
    pub organizations: String,
    pub from_start_date: NaiveDateTimeForm,
    pub to_start_date: NaiveDateTimeForm,
}

#[get("/file-entries?<fields..>")]
pub fn list_organization_user_file_entries(
    fields: Form<ListOrgUserFileEntriesRequest>,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<Vec<models::UserFileEntryWithAssoc>> {
    let ListOrgUserFileEntriesRequest {
        organizations,
        from_start_date,
        to_start_date
    } = fields.into_inner();

    let org_ids = organizations.split(',')
        .map(|id| id.parse::<i32>().unwrap())
        .collect();

    let entries = file_entries::find_by_orgs(
        org_ids,
        *from_start_date,
        *to_start_date,
        &*titan_db,
        &*wcf_db,
        &app_config
    );

    Json(entries.unwrap())
}
