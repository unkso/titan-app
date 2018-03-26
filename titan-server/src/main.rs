#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate titan;
extern crate rocket;

use titan::modules::roster;

fn main() {
    rocket::ignite().mount("/", routes![
        roster::controller::get_clan_roster
    ]).launch();
}
