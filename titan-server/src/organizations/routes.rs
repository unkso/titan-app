use rocket::{get, State, http::RawStr, response::status};
use rocket_contrib::json::Json;
use serde::Serialize;

use crate::db::{UnksoMainForums, TitanPrimary};
use crate::models;
use crate::config;
use crate::organizations;

#[derive(Serialize)]
pub struct FindOrganizationResponse {
    organization: models::TitanOrganization,
    users: Vec<models::TitanUserProfile>
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
        &unkso_titan
    );

    if organization_result.is_err() {
        return Err(status::NotFound("".to_string()))
    }

    let organization = organization_result.unwrap();
    let users_query = organizations::organizations::find_users(
        &organization,
        &unkso_main
    );

    let mut users: Vec<models::TitanUserProfile> = vec![];
    if users_query.is_ok() {
        let users_result = users_query.unwrap();
        let wcf_ids: Vec<i32> = users_result.iter().map(|(u, _)| u.user_id).collect();
        let titan_profiles = crate::accounts::users::find_all_by_wcf_id(wcf_ids, &*unkso_titan);

        if titan_profiles.is_err() {
            return Err(status::NotFound("".to_string()));
        }

        // @todo Many other parts of the application will use this logic. Move to a common module
        // so other modules have access to it.
        for ((wcf_user, wcf_avatar), ref titan_profile) in users_result.iter().zip(titan_profiles.unwrap()) {
            users.push(models::TitanUserProfile {
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
                last_activity: titan_profile.last_activity,
                wcf: models::WcfUserProfile {
                    avatar_url: Some(format!("{}/{}", app_config.avatar_base_url, wcf_avatar.get_avatar_url())),
                    last_activity_time: wcf_user.last_activity_time,
                    user_title: wcf_user.user_title.clone(),
                    username: wcf_user.username.clone(),
                }
            })
        }
    }

    Ok(Json(FindOrganizationResponse {
        organization,
        users
    }))
}
