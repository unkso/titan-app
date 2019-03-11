use rocket::get;
use rocket_contrib::json::Json;

use crate::db::{UnksoMainForums};
use crate::models;
use diesel::prelude::*;
use crate::guards::auth_guard;
use crate::schema::wcf1_user;

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