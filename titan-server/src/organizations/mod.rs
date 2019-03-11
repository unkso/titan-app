use rocket::{Route, routes};

mod routes;
pub mod organizations;
pub mod roles;

pub fn get_routes() -> Vec<Route> {
    routes![
        routes::get_all,
        routes::get_organization_by_id,
        routes::get_organization_by_slug,
        routes::get_organization_users,
        routes::list_organization_roles,
        routes::get_organization_user_coc,
        routes::get_organization_coc,
        routes::get_organization_unranked_roles,
        routes::get_child_organizations
    ]
}
