#![feature(plugin, decl_macro, custom_attribute, proc_macro_hygiene)]

use rocket::{routes, fairing::AdHoc};

use libtitan::routes;
use libtitan::db;
use libtitan::config;
use libtitan::accounts;
use libtitan::organizations;

fn main() {
    rocket::ignite()
        .attach(db::TitanPrimary::fairing())
        .attach(db::UnksoMainForums::fairing())
        .attach(AdHoc::on_attach("Config", |rocket| {
            let settings = config::AppConfig::from_env(&rocket.config());
            match settings {
                Ok(settings) => Ok(rocket.manage(settings)),
                Err(_) => Err(rocket),
            }
        }))
        .mount("/api/auth/pulse", routes![routes::health_check])
        .mount("/api/auth", accounts::get_auth_routes())
        .mount("/api/users", accounts::get_user_routes())
        .mount("/api/organizations", organizations::get_routes())
        .launch();
}