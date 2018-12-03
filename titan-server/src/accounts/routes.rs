use rocket::response::status;
use rocket::State;
use rocket_contrib::json::Json;
use frank_jwt::{Algorithm, encode};
use super::config;
use db::{UnksoMainForums, TitanPrimary};
use super::woltlab_auth_helper;
use models;
use super::users;
use super::wcf_users;

/** **************************************************
 *  Auth
 ** **************************************************/
#[derive(Deserialize)]
pub struct WoltlabLoginRequest {
    pub user_id: i32,
    pub password_token: String
}

#[derive(Serialize)]
pub struct WoltlabLoginResponse {
    pub token: String,
    pub user: models::TitanUser,
    pub wcf_username: String,
    pub wcf_user_title: String
}

#[post("/woltlab", format = "application/json", data = "<login_creds>")]
pub fn woltlab_login(
    unkso_main: UnksoMainForums,
    titan_primary: TitanPrimary,
    login_creds: Json<WoltlabLoginRequest>,
    app_config: State<config::AppConfig>
) -> Result<Json<WoltlabLoginResponse>, status::NotFound<String>> {
    // @Todo Handle error state
    let wcf_user: models::WcfUser = wcf_users::find_by_user_id(
        login_creds.user_id,
        &*unkso_main
    ).unwrap();

    let is_valid = woltlab_auth_helper::check_password(
        &wcf_user.password,
        &login_creds.password_token
    );

    if !is_valid {
        return Err(status::NotFound("Invalid credentials".to_string()));
    }

    let user_res = users::create_if_not_exists(&wcf_user, &*titan_primary);

    if user_res.is_err() {
        return Err(status::NotFound("".to_string()));
    }

    let user = user_res.unwrap();

    let header = json!({});
    let payload = json!({
        "user": {
            "id": user.id,
            "wcf_id": user.wcf_id
        }
    });

    let token = encode(
        header.into(),
        &app_config.secret_key,
        &payload,
        Algorithm::HS256
    );

    return Ok(Json(WoltlabLoginResponse {
        token: token.unwrap(),
        user,
        wcf_username: wcf_user.username,
        wcf_user_title: wcf_user.user_title
    }));
}