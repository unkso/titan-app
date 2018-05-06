#![feature(plugin)]
#![plugin(rocket_codegen)]
extern crate titan;
extern crate rocket;
extern crate r2d2;
extern crate r2d2_diesel;
extern crate serde;
extern crate serde_json;

use titan::modules::roster;
use titan::database;

fn main() {
    rocket::ignite()
        .manage(database::init_pool())
        .mount("/", routes![
            roster::controller::get_roster,
            roster::controller::create_member
        ])
        .launch();
}
