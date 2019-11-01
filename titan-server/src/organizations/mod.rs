use rocket::{Route, routes};

mod routes;
pub mod organizations;
pub mod reports;
pub mod roles;

pub fn get_routes() -> Vec<Route> {
    routes![
        routes::add_user,
        routes::ack_organization_report,
        routes::create_organization_report,
        routes::get_all,
        routes::get_all_unacknowledged_reports,
        routes::get_organization_by_id,
        routes::get_organization_by_slug,
        routes::get_organization_users,
        routes::get_parent_role,
        routes::get_organization_user_coc,
        routes::get_organization_coc,
        routes::get_organization_unranked_roles,
        routes::get_child_organizations,
        routes::list_organization_reports,
        routes::list_organization_user_file_entries,
        routes::list_organization_roles,
        routes::remove_user,
        routes::reorder_roles,
    ]
}
