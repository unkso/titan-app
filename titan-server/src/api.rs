use std::io::Cursor;
use diesel::result::Error as DieselError;
use rocket::response::Responder;
use rocket::{Response, Request};
use rocket::http::{ContentType, Status};
use serde::{Serialize};
use crate::db::TitanDatabaseError;

/// Fields returned from the API when an error occurs.
#[derive(Serialize)]
pub struct ApiErrorResponse {
    /// Describes the cause of an error. The contents of this message
    /// should be easily understood by the user and not expose
    /// sensitive details that may violate the security of the user
    /// or system.
    message: String,
}

/// Enumeration of error types that may be returned in a response
/// to client apps.
pub enum ApiError {
    TitanDatabaseError(TitanDatabaseError),
}

impl ApiError {
    /// Derives either an error message or an HTTP status from a
    /// database error.
    fn message_from_db_err<'r>(error: TitanDatabaseError) -> Result<&'r str, Status> {
        match error {
            TitanDatabaseError::DieselError(db_error) => {
                if db_error == DieselError::NotFound {
                    return Err(Status::NotFound);
                }
                return Err(Status::InternalServerError)
            },
            _ => Err(Status::InternalServerError),
        }
    }
}

impl<'r> Responder<'r> for ApiError {
    /// Implementation of Rocket's `Responder`. Converts API errors to
    /// a user-friendly JSON structure.
    fn respond_to(self, _: &Request) -> Result<Response<'r>, Status> {
        let message: Result<&str, Status> = match self {
            ApiError::TitanDatabaseError(error) =>
                ApiError::message_from_db_err(error),
        };

        match message {
            Ok(text) => {
                let response = json!(ApiErrorResponse {
                    message: text.to_string(),
                });
                Response::build()
                    .sized_body(Cursor::new(format!("{:?}", response)))
                    .header(ContentType::new("application", "json"))
                    .ok()
            },
            Err(err) => Err(err)
        }
    }
}
