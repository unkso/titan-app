#![feature(plugin)]
#![feature(custom_attribute)]
#![plugin(rocket_codegen)]

#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate diesel;
#[macro_use] extern crate dotenv_codegen;

extern crate r2d2;
extern crate r2d2_diesel;
extern crate rocket;
extern crate serde_json;

pub mod common;
pub mod modules;
pub mod database;