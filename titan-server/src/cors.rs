use rocket::{fairing::AdHoc};

pub fn fairing() -> AdHoc {
    AdHoc::on_attach("Cors", |rocket| {
        let allowed_origins = rocket.config().get_table("cors")
            .map(|cors_config| {
                match cors_config.get("allowed_origins") {
                    Some(origin_values) => {
                        let origins: Vec<&str> = origin_values.as_array()
                            .expect("Expected config option \"{ENV}.cors.allowed_origins\" to be an array")
                            .into_iter()
                            .map(|value| value.as_str()
                                .expect("Invalid entry found in \"{ENV}.cors.allowed_origins\" array"))
                            .collect();
                        rocket_cors::AllowedOrigins::some_exact(&origins)
                    },
                    None => rocket_cors::AllowedOrigins::default()
                }
            })
            .unwrap_or_else(|_| rocket_cors::AllowedOrigins::default());
        let options = rocket_cors::CorsOptions {
            allowed_origins,
            ..Default::default()
        };

        Ok(rocket.attach(options.to_cors().unwrap()))
    })
}
