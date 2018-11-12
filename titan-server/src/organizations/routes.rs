use rocket::State;
use rocket::http::RawStr;
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

#[get("/<slug>")]
pub fn find_organization(
    slug: &RawStr,
    unkso_main: UnksoMainForums,
    unkso_titan: TitanPrimary,
    app_config: State<config::AppConfig>
) -> Result<Json<FindOrganizationResponse>, status::NotFound<String>> {
    let organization_result = organizations::organizations::find_by_slug(
        slug.as_str(),
        unkso_titan
    );

    if organization_result.is_err() {
        return Err(status::NotFound("".to_string()))
    }

    let organization = organization_result.unwrap();
    let users_query = organizations::organizations::find_users(
        &organization,
        unkso_main
    );

    let mut users: Vec<OrganizationUser>= vec![];
    if users_query.is_ok() {
        let users_result = users_query.unwrap();

        // @todo Many other parts of the application will use this logic. Move to a common module
        // so other modules have access to it.
        for user in users_result {
            users.push(OrganizationUser {
                user: user.0,
                avatar: format!("{}/{}", app_config.avatar_base_url, user.1.get_avatar_url())
            })
        }
    }

    Ok(Json(FindOrganizationResponse {
        organization,
        users
    }))
}