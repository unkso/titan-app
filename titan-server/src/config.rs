use rocket::Config;
use rocket::config::ConfigError;

pub struct AuthConfig {
    pub secret_key: String
}

impl AuthConfig {
    pub fn from_env(config: &rocket::Config) -> Result<AuthConfig, ConfigError> {
        Ok(AuthConfig {
            secret_key: config.get_str("auth_key").unwrap().to_string()
        })
    }
}