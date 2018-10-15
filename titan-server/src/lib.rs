#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate diesel;
extern crate serde;
#[macro_use] extern crate serde_derive;

pub mod routes;
pub mod db;
pub mod models;
pub mod schema;
