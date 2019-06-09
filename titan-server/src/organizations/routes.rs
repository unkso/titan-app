use rocket::{get, State, http::RawStr, response::status};
use rocket_contrib::json::Json;
use rocket::request::Form;
use serde::{Deserialize, Serialize};
use diesel::result::QueryResult;

use crate::db::{UnksoMainForums, TitanPrimary};
use crate::models;
use crate::config;
use crate::organizations;
use crate::accounts;
use crate::guards::form::NaiveDateTimeForm;
use crate::accounts::file_entries;
use crate::guards::auth_guard;

#[derive(Serialize)]
pub struct FindOrganizationResponse {
    organization: models::Organization,
    users: Vec<models::UserProfile>
}

#[get("/")]
pub fn get_all(titan_primary: TitanPrimary) -> Result<Json<Vec<models::Organization>>, status::NotFound<String>> {
    let organizations = organizations::organizations::find_all(titan_primary);

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
    let organization = organizations::organizations::find_by_id(id, &*titan_db);

    if organization.is_err() {
        return Err(status::NotFound("".to_string()));
    }

    Ok(Json(organization.unwrap()))
}

#[get("/<slug>", rank = 2)]
pub fn get_organization_by_slug(
    slug: &RawStr,
    unkso_main: UnksoMainForums,
    unkso_titan: TitanPrimary,
    app_config: State<config::AppConfig>
) -> Result<Json<FindOrganizationResponse>, status::NotFound<String>> {
    let organization_result = organizations::organizations::find_by_slug(
        slug.as_str(),
        &unkso_titan
    );

    if organization_result.is_err() {
        return Err(status::NotFound("".to_string()))
    }

    let organization = organization_result.unwrap();
    let users_query = organizations::organizations::find_users_old(
        &organization,
        &unkso_main
    );

    let mut users: Vec<models::UserProfile> = vec![];
    if users_query.is_ok() {
        let users_result = users_query.unwrap();
        let wcf_ids: Vec<i32> = users_result.iter().map(|(u, _)| u.user_id).collect();
        let titan_profiles = crate::accounts::users::find_all_by_wcf_id(wcf_ids, &*unkso_titan);

        if titan_profiles.is_err() {
            return Err(status::NotFound("".to_string()));
        }

        // @todo Many other parts of the application will use this logic. Move to a common module
        // so other modules have access to it.
        for ref titan_profile in titan_profiles.unwrap() {
            let (wcf_user, wcf_avatar) = users_result.iter().find(|(u, _)| u.user_id == titan_profile.wcf_id).unwrap();
            let wcf_user_profile = models::WcfUserProfile {
                avatar_url: Some(format!("{}/{}", app_config.avatar_base_url, wcf_avatar.get_avatar_url())),
                last_activity_time: wcf_user.last_activity_time,
                user_title: wcf_user.user_title.clone(),
                username: wcf_user.username.clone(),
            };

            users.push(models::UserProfile {
                id: titan_profile.id,
                wcf_id: titan_profile.wcf_id,
                legacy_player_id: titan_profile.legacy_player_id,
                rank_id: titan_profile.rank_id,
                username: titan_profile.username.clone(),
                orientation: titan_profile.orientation,
                bct_e0: titan_profile.bct_e0,
                bct_e1: titan_profile.bct_e1,
                bct_e2: titan_profile.bct_e2,
                bct_e3: titan_profile.bct_e3,
                loa: titan_profile.loa,
                a15: titan_profile.a15,
                date_joined: titan_profile.date_joined,
                last_activity: titan_profile.last_activity.unwrap_or(chrono::Utc::now().naive_utc()),
                wcf: wcf_user_profile,
            })
        }
    }

    Ok(Json(FindOrganizationResponse {
        organization,
        users
    }))
}

#[get("/<id>/roles")]
pub fn list_organization_roles(
    id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<Vec<models::OrganizationRoleWithAssoc>> {
    let titan_db_ref = &*titan_db;
    let roles = organizations::roles::find_all_by_organization(id, titan_db_ref).unwrap();
    let roles_with_users = organizations::roles::map_roles_assoc(
        roles, titan_db_ref, &*wcf_db, &app_config);

    Json(roles_with_users.unwrap())
}

#[get("/<org_id>/children")]
pub fn get_child_organizations(
    org_id: i32,
    titan_db: TitanPrimary
) -> Json<Vec<models::Organization>> {
    Json(organizations::organizations::find_children(
        org_id, &*titan_db).unwrap())
}

#[get("/<org_id>/children/ids?<recursive>")]
pub fn get_child_organization_ids(
    org_id: i32,
    recursive: Option<bool>,
    titan_db: TitanPrimary
) -> Json<Vec<i32>> {
    let include_recursive = match recursive {
        Some(recursive) => recursive,
        _ => false
    };

    Json(organizations::organizations::find_children_ids(
        org_id, include_recursive, &*titan_db))
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
    let users = organizations::organizations::find_users(
        id, include_children, &*titan_db).unwrap();

    Json(accounts::users::map_users_to_profile(users, &*wcf_db, &app_config).unwrap())
}

#[get("/<org_id>/users/<user_id>/coc")]
pub fn get_organization_user_coc(
    org_id: i32,
    user_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<models::ChainOfCommand> {
    Json(organizations::roles::find_user_coc(
        org_id, user_id, &*titan_db, &*wcf_db, app_config).unwrap())
}

/// Returns a list of all the roles that are under the chain of
/// command of the authenticated user.
pub fn get_all_organization_child_coc(
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    auth_user: auth_guard::AuthenticatedUser
) {

}

#[get("/<org_id>/coc")]
pub fn get_organization_coc(
    org_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<models::ChainOfCommand> {
    Json(organizations::roles::find_org_coc(
        org_id, std::i32::MAX, &*titan_db, &*wcf_db, &app_config).unwrap())
}

#[get("/<org_id>/roles/unranked")]
pub fn get_organization_unranked_roles(
    org_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<Vec<models::OrganizationRoleWithAssoc>> {
    Json(organizations::roles::find_unranked_roles(
        org_id, &*titan_db, &*wcf_db, &app_config).unwrap())
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
    let mut coc = organizations::roles::find_org_coc(
        org_id, std::i32::MAX, titan_db_ref, wcf_db_ref, &app_config).unwrap();
    let mut roles = coc.local_coc;
    roles.append(&mut coc.extended_coc);

    for role in roles.drain(..) {
        if role.user_profile.unwrap().id == auth_user.user.id {
            let mut reports: QueryResult<Vec<models::ReportWithAssoc>>;
            if role.organization.id != org_id {
                reports = organizations::reports::find_all_by_organization(
                    org_id, titan_db_ref, &*wcf_db, &app_config);
            } else {
                reports = organizations::reports::find_all_by_org_up_to_rank(
                    org_id, role.rank.unwrap(), titan_db_ref,
                    &*wcf_db, &app_config);
            }

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

    let mut roles = organizations::roles::find_ranked_by_user_id(
        auth_user.user.id, titan_db_ref).unwrap();
    let mut direct_report_ids: Vec<i32> = vec!();

    for role in roles.drain(..) {
        let mut direct_reports = organizations::roles::find_direct_reports(
            role.organization_id, role.rank.unwrap(), titan_db_ref, wcf_db_ref, &app_config).unwrap();
        direct_report_ids.append(&mut direct_reports.iter_mut()
            .map(|role| role.id).collect());
    }

    let reports = organizations::reports::find_unacknowledged_by_role_ids(
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
    let role = organizations::roles::find_org_role_by_user_id(
        org_id, auth_user.user.id, titan_db_ref).unwrap();
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

    let saved_report = organizations::reports::save_report(
        &new_report, titan_db_ref, &*wcf_db, &app_config);

    match saved_report {
        Ok(report) => Ok(Json(report)),
        Err(err) => Err(status::BadRequest(Some(err.to_string())))
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
