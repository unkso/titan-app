use rocket;
use config;
use woltlab_auth_helper;

mod routes;
pub mod users;
pub mod wcf_users;

pub fn get_routes() -> Vec<rocket::Route> {
    routes![
        routes::woltlab_login
    ]
}