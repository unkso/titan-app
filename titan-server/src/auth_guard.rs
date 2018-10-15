use rocket::request::{FromRequest, Outcome, Request};
use rocket::http::Status;
use frank_jwt::{decode, Algorithm};
use rocket::State;
use super::config::AuthConfig;
use rocket_contrib::json::JsonValue;
use super::db::{UnksoMainForums};
use super::models;
use super::schema::wcf1_user;
use diesel::RunQueryDsl;
use diesel::query_dsl::filter_dsl::FindDsl;
use super::models::WcfUser;

pub struct SecretKey(String);

#[derive(Serialize, Deserialize)]
pub struct AuthCredentials {
    pub header: JsonValue,
        payload: JsonValue,
        token: String
}

#[derive(Serialize, Deserialize)]
pub struct AuthenticatedUser {
    pub credentials: AuthCredentials,
        user: WcfUser
}

#[derive(Debug)]
pub enum AuthTokenError {
    MissingToken,
    InvalidToken
}

impl<'a, 'r> FromRequest<'a, 'r> for AuthenticatedUser {
    type Error = AuthTokenError;
    fn from_request(request: &'a Request<'r>) -> rocket::request::Outcome<Self, Self::Error> {
        let db = request.guard::<UnksoMainForums>().unwrap();
        let key = request.guard::<State<AuthConfig>>().unwrap();
        let auth_headers: Vec<_> = request.headers().get("x-api-key").collect();

        if auth_headers.len() != 1 {
            return rocket::Outcome::Failure((Status::BadRequest, AuthTokenError::MissingToken));
        }

        let parsed_token = decode(
            &auth_headers[0].to_string(),
            &key.secret_key,
            Algorithm::HS256
        );

        match parsed_token {
            Ok(result) => {
                let user: models::WcfUser = wcf1_user::table.find(
                    result.1["user"]["user_id"].to_string().parse::<i32>().unwrap()
                )
                .first(&*db)
                .unwrap();

                return rocket::Outcome::Success(AuthenticatedUser {
                    credentials: AuthCredentials {
                        header: JsonValue(result.0),
                        payload: JsonValue(result.1),
                        token: auth_headers[0].to_string()
                    },
                    user
                });
            }
            _ => {
                return rocket::Outcome::Failure((Status::BadRequest, AuthTokenError::InvalidToken))
            }
        }
    }
}