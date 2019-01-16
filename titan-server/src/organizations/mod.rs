use rocket;

mod routes;
mod organizations;

pub fn get_routes() -> Vec<rocket::Route> {
    routes![
        routes::find_organization_group,
        routes::find_organization_group_unit,
        routes::find_organization_users,
    ]
}