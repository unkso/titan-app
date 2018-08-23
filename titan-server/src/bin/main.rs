#![feature(plugin, decl_macro)]
#![plugin(rocket_codegen)]

extern crate libtitan;
extern crate rocket;
extern crate rocket_contrib;

use libtitan::routes;
use libtitan::db;

fn main() {
    rocket::ignite()
        .attach(db::TitanPrimary::fairing())
        .attach(db::UnksoMainForums::fairing())
        .mount("/users", routes![routes::hello, routes::test_database_conn])
        .launch();
}
