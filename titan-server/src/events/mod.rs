use rocket::{Route, routes};

mod routes;
mod event_types;

pub fn get_routes() -> Vec<Route> {
    routes![
        routes::get_event_type_by_id,
        routes::list_event_types
    ]
}
