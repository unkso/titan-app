use rocket::config::ConfigError;

pub struct AppConfig {
    pub secret_key: String,
    pub avatar_base_url: String
}

impl AppConfig {
    pub fn from_env(config: &rocket::Config) -> Result<AppConfig, ConfigError> {
        Ok(AppConfig {
            avatar_base_url: config.get_str("avatar_base_url").unwrap().to_string(),
            secret_key: config.get_str("auth_key").unwrap().to_string()
        })
    }
}