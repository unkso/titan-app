use rocket::get;
use super::db::{UnksoMainForums};
use super::models;
use rocket_contrib::json::Json;
use diesel::prelude::*;
use super::auth_guard;
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

#[get("/pulse", format = "application/json")]
pub fn health_check(token: auth_guard::AuthenticatedUser) -> Json<auth_guard::AuthenticatedUser> {
    return Json(token)
}