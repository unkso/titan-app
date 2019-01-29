#![feature(plugin, decl_macro, custom_attribute, proc_macro_hygiene)]
#![recursion_limit="256"]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate diesel;
extern crate serde;
#[macro_use] extern crate serde_derive;
extern crate regex;
extern crate frank_jwt;
extern crate rocket_cors;
extern crate chrono;
extern crate pwhash;
extern crate rand;
#[macro_use] extern crate lazy_static;

pub mod routes;
pub mod db;
pub mod models;
pub mod schema;
pub mod woltlab_auth_helper;
pub mod auth_guard;
pub mod config;
pub mod cors_fairing;
pub mod accounts;
pub mod organizations;