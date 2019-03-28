#![feature(plugin, decl_macro, custom_attribute, proc_macro_hygiene)]
#![recursion_limit="256"]

#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate rocket;
#[macro_use] extern crate diesel;

pub mod accounts;
pub mod config;
pub mod db;
pub mod guards;
pub mod models;
pub mod organizations;
pub mod events;
pub mod routes;
pub mod schema;
pub mod woltlab_auth_helper;
