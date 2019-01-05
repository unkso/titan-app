#![feature(plugin, decl_macro, custom_attribute, proc_macro_hygiene)]

extern crate libtitan;
#[macro_use] extern crate rocket;
use rocket::fairing::AdHoc;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate diesel;
extern crate regex;
extern crate bcrypt;
extern crate frank_jwt;
extern crate rocket_cors;

use libtitan::routes;
use libtitan::db;
use libtitan::config;
use libtitan::cors_fairing;
use libtitan::accounts;
use libtitan::organizations;

fn main() {
    rocket::ignite()
        .attach(db::TitanPrimary::fairing())
        .attach(db::UnksoMainForums::fairing())
        .attach(cors_fairing::cors())
        .attach(AdHoc::on_attach("Config", |rocket| {
            let settings = config::AppConfig::from_env(&rocket.config());
            match settings {
                Ok(settings) => Ok(rocket.manage(settings)),
                Err(_) => Err(rocket),
            }
        }))
        .mount("/auth/pulse", routes![routes::health_check])
        .mount("/auth", accounts::get_auth_routes())
        .mount("/users", accounts::get_user_routes())
        .mount("/organizations", organizations::get_routes())
        .launch();
}