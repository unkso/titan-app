#![feature(plugin, decl_macro)]
#![plugin(rocket_codegen)]
#![recursion_limit="256"]

extern crate rocket;
extern crate rocket_contrib;
#[macro_use] extern crate diesel;
extern crate serde;
#[macro_use] extern crate serde_derive;

pub mod routes;
pub mod db;
pub mod models;
pub mod schema;
