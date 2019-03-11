use rocket::{get, State, http::RawStr, response::status};
use rocket_contrib::json::Json;
use serde::Serialize;

use crate::db::{UnksoMainForums, TitanPrimary};
use crate::models;
use crate::config;
use crate::organizations;
use crate::accounts;

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
