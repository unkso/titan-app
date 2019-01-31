#![feature(plugin, decl_macro, custom_attribute, proc_macro_hygiene)]
#![recursion_limit="256"]

#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate diesel;

pub mod routes;
pub mod db;
pub mod models;
pub mod schema;
pub mod woltlab_auth_helper;
pub mod auth_guard;
pub mod config;
pub mod accounts;
pub mod organizations;