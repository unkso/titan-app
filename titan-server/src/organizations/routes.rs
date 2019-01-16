use rocket::State;
use rocket::http::RawStr;
use rocket::request::Form;
use rocket::response::status;
use rocket_contrib::json::Json;
use db::{UnksoMainForums, TitanPrimary};
use models;
use config;
use organizations;

#[derive(Serialize)]
pub struct OrganizationUser {
    user: models::WcfUser,
    avatar: String
}

#[derive(Serialize)]
pub struct FindOrganizationResponse {
    organization: models::TitanOrganization,
    users: Vec<OrganizationUser>
}

#[get("/<group_type>/<group>", rank = 1)]
pub fn find_organization_group(
    group_type: String,
    group: String,
    titan_db: TitanPrimary
) -> Result<Json<models::TitanOrganization>, status::NotFound<String>> {
    let org = organizations::organizations::find_by_path(
        &group_type,
        &vec![&*group],
        &*titan_db
    );

    if org.is_none() {
        return Err(status::NotFound("".to_string()))
    }

    Ok(Json(org.unwrap()))
}

#[get("/<group_type>/<group>/<unit>")]
pub fn find_organization_group_unit(
    group_type: String,
    group: String,
    unit: String,
    titan_db: TitanPrimary
) -> Result<Json<models::TitanOrganization>, status::NotFound<String>> {
    let org = organizations::organizations::find_by_path(
        &group_type,
        &vec![&*group, &*unit],
        &*titan_db
    );

    if org.is_none() {
        return Err(status::NotFound("".to_string()))
    }

    Ok(Json(org.unwrap()))
}

#[get("/<id>/users", rank = 0)]
pub fn find_organization_users(
    id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Result<Json<Vec<OrganizationUser>>, status::NotFound<String>> {
    let titan_db_ref = &*titan_db;
    let users_query = organizations::organizations::find_users(
        id,
        titan_db_ref,
        &*wcf_db
    );

    if users_query.is_err() {
        return Err(status::NotFound("".to_string()))
    }

    let mut users: Vec<OrganizationUser>= vec![];
    if users_query.is_ok() {
        let users_result = users_query.unwrap();
        for user in users_result {
            users.push(OrganizationUser {
                user: user.0,
                avatar: format!("{}/{}", app_config.avatar_base_url, user.1.get_avatar_url())
            })
        }
    }

    Ok(Json(users))
}