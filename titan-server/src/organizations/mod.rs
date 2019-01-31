use rocket::{Route, routes};

mod routes;
mod organizations;

pub fn get_routes() -> Vec<Route> {
    routes![
        routes::find_organization
    ]
}