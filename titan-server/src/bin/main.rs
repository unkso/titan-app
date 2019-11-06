#![feature(plugin, decl_macro, custom_attribute, proc_macro_hygiene)]

use rocket::routes;

use libtitan::accounts;
use libtitan::config;
use libtitan::db;
use libtitan::teams;
use libtitan::events;
use libtitan::routes;

fn main() {
    rocket::ignite()
        .attach(db::TitanPrimary::fairing())
        .attach(db::UnksoMainForums::fairing())
        .attach(config::AppConfig::fairing())
        .mount("/api/auth/pulse", routes![routes::health_check])
        .mount("/api/auth", accounts::get_auth_routes())
        .mount("/api/users", accounts::get_user_routes())
        .mount("/api/organizations", teams::get_routes())
        .mount("/api/events", events::get_routes())
        .launch();
}
