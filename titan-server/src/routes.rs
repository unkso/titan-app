use super::db::{UnksoMainForums};
use super::models;
use rocket::State;
use rocket_contrib::json::Json;
use diesel::prelude::*;
use super::woltlab_auth_helper;
use super::auth_guard;
use frank_jwt::{Algorithm, encode};
use super::config;
use super::schema::wcf1_user;

#[get("/hello")]
pub fn hello() -> &'static str {
    "Hello from Project Titan!"
}

#[get("/<user_id>")]
pub fn test_database_conn(user_id: i32, unkso_main: UnksoMainForums) -> Json<models::WcfUser> {
    let user = wcf1_user::table.find(user_id).first(&*unkso_main).unwrap();

    Json(user)
}

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
    pub user: Option<models::WcfUser>
}

#[post("/woltlab", format = "application/json", data = "<login_creds>")]
pub fn woltlab_login(
    unkso_main: UnksoMainForums,
    login_creds: Json<WoltlabLoginRequest>,
    app_config: State<config::AppConfig>) -> Json<WoltlabLoginResponse> {
    let user: models::WcfUser = wcf1_user::table.find(login_creds.user_id)
        .first(&*unkso_main)
        .unwrap();

    let is_valid = woltlab_auth_helper::check_password(
        &user.password,
        &login_creds.password_token
    );

    if !is_valid {
        return Json(WoltlabLoginResponse {
            token: "".to_string(),
            user: None
        });
    }

    let header = json!({});
    let payload = json!({
        "user": {
            "user_id": user.user_id,
            "username": user.username
        }
    });

    let token = encode(
        header.into(),
        &app_config.secret_key,
        &payload,
        Algorithm::HS256
    );

    return Json(WoltlabLoginResponse {
        token: token.unwrap(),
        user: Some(user)
    });
}

#[get("/pulse", format = "application/json")]
pub fn health_check(token: auth_guard::AuthenticatedUser) -> Json<auth_guard::AuthenticatedUser> {
    return Json(token)
}