use super::db::{UnksoMainForums};
use super::models;
use rocket_contrib::Json;
use super::schema::wcf1_user;
use diesel::RunQueryDsl;
use diesel::query_dsl::filter_dsl::FindDsl;

#[get("/hello")]
pub fn hello() -> &'static str {
    "Hello from Project Titan!"
}

#[get("/<user_id>")]
pub fn test_database_conn(user_id: i32, unkso_main: UnksoMainForums) -> Json<models::WcfUser> {
    let user = wcf1_user::table.find(user_id).first(&*unkso_main).unwrap();

    Json(user)
}