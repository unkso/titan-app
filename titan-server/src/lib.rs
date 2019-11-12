#![feature(plugin, decl_macro, proc_macro_hygiene)]
#![recursion_limit="256"]

#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate rocket;
#[macro_use] extern crate diesel;

pub mod api;
pub mod accounts;
pub mod catchers;
pub mod config;
pub mod db;
pub mod guards;
pub mod models;
pub mod teams;
pub mod events;
pub mod routes;
pub mod schema;
pub mod woltlab_auth_helper;
