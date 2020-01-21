#![feature(plugin, decl_macro, proc_macro_hygiene)]

#[macro_use] extern crate rocket;
extern crate rocket_cors;

use rocket::routes;
use libtitan::accounts;
use libtitan::catchers;
use libtitan::config;
use libtitan::cors;
use libtitan::db;
use libtitan::teams;
use libtitan::events;
use libtitan::routes;

fn main() {
    rocket::ignite()
        .attach(db::TitanPrimary::fairing())
        .attach(db::UnksoMainForums::fairing())
        .attach(config::AppConfig::fairing())
        .attach(cors::fairing())
        .mount("/api/auth/pulse", routes![routes::health_check])
        .mount("/api/auth", accounts::get_auth_routes())
        .mount("/api/users", accounts::get_user_routes())
        .mount("/api/organizations", teams::get_routes())
        .mount("/api/events", events::get_routes())
        .register(catchers![
            catchers::handle_400_bad_request,
            catchers::handle_401_unauthorized,
            catchers::handle_404_not_found,
            catchers::handle_500_internal_server_error,
        ])
        .launch();
}
