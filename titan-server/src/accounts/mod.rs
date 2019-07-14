use rocket::{Route, routes};

pub mod acl;
pub mod file_entries;
pub mod file_entry_types;
pub mod users;
pub mod excuses;

mod routes;

pub fn get_auth_routes() -> Vec<Route> {
    routes![
        routes::woltlab_login
    ]
}

pub fn get_user_routes() -> Vec<Route> {
    routes![
        routes::ack_user_event_excuse,
        routes::get_user,
        routes::save_user_file_entry,
        routes::list_unacknowledged_excuses,
        routes::list_user_file_entry_types,
        routes::list_user_file_entries,
        routes::list_user_event_excuses,
        routes::save_user_event_excuse,
        routes::list_users,
        routes::get_user_organizations,
    ]
}
