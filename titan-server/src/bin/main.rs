#![feature(plugin, decl_macro, proc_macro)]
#![plugin(rocket_codegen)]

extern crate libtitan;
extern crate rocket;
extern crate rocket_contrib;

use libtitan::routes;
use libtitan::db;

fn main() {
    rocket::ignite()
        .manage(db::TitanPrimaryPool::init_pool())
        .manage(db::UnksoMainForumsPool::init_pool())
        .mount("/users", routes![routes::hello, routes::test_database_conn])
        .launch();
}
