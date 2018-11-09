use rocket::http::Method;
use rocket::{get, routes};
use rocket_cors::{AllowedOrigins, Cors};

pub fn cors() -> Cors {
    // @todo move allowed origins to config
    let (allowed_origins, failed_origins) = AllowedOrigins::some(&[
        "http://localhost:3000"
    ]);
    assert!(failed_origins.is_empty());

    // You can also deserialize this
    rocket_cors::Cors {
        allowed_origins,
        allowed_methods: vec![
            Method::Get,
            Method::Post,
            Method::Put,
            Method::Delete,
            Method::Options
        ].into_iter().map(From::from).collect(),
        allow_credentials: true,
        ..Default::default()
    }
}