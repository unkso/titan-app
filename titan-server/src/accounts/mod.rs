use rocket::{Route, routes};
use crate::config;
use crate::woltlab_auth_helper;

mod routes;
pub mod users;
pub mod file_entries;
pub mod file_entry_types;
pub mod acl;

pub fn get_auth_routes() -> Vec<Route> {
    routes![
        routes::woltlab_login
    ]
}

pub fn get_user_routes() -> Vec<Route> {
    routes![
        routes::get_user,
        routes::save_user_file_entry,
        routes::list_user_file_entry_types,
        routes::list_user_file_entries
    ]
}