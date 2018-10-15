#![feature(plugin, decl_macro, custom_attribute, proc_macro_hygiene)]

extern crate libtitan;
#[macro_use] extern crate rocket;
use rocket::fairing::AdHoc;
#[macro_use] extern crate rocket_contrib;
extern crate regex;
extern crate bcrypt;
extern crate frank_jwt;
extern crate rocket_cors;

use libtitan::routes;
use libtitan::db;
use libtitan::config;
use libtitan::cors_fairing;

fn main() {
    rocket::ignite()
        .attach(db::TitanPrimary::fairing())
        .attach(db::UnksoMainForums::fairing())
        .attach(cors_fairing::cors())
        .attach(AdHoc::on_attach("Auth", |rocket| {
            let settings = config::AuthConfig::from_env(&rocket.config());
            match settings {
                Ok(settings) => Ok(rocket.manage(settings)),
                Err(_) => Err(rocket),
            }
        }))
        .mount("/auth", routes![routes::woltlab_login, routes::health_check])
        .mount("/users", routes![routes::hello, routes::test_database_conn])
        .launch();
}