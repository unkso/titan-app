use std::io::Cursor;
use diesel::result::Error as DieselError;
use rocket::response::{Responder};
use rocket::{Response, Request};
use rocket::http::{ContentType, Status};
use serde::Serialize;
use serde_json;
use crate::db::TitanDatabaseError;
use std::error::Error;

/// A structure that translates a `Result` into a well-formed API
/// response.
pub struct ApiResponse<T: Serialize> {
    result: Result<T, ApiError>,
}

impl<T: Serialize> From<Result<T, ApiError>> for ApiResponse<T> {
    fn from (res: Result<T, ApiError>) -> Self {
        ApiResponse {
            result: res
        }
    }
}

impl<T: Serialize> From<Result<T, TitanDatabaseError>> for ApiResponse<T> {
    fn from (res: Result<T, TitanDatabaseError>) -> Self {
        ApiResponse {
            result: res.map_err(ApiError::from)
        }
    }
}

impl<T: Serialize> From<TitanDatabaseError> for ApiResponse<T> {
    fn from (err: TitanDatabaseError) -> Self {
        ApiResponse {
            result: Err(ApiError::from(err))
        }
    }
}

impl<T: Serialize> From<T> for ApiResponse<T> {
    fn from(value: T) -> Self {
        ApiResponse {
            result: Ok(value),
        }
    }
}

impl<T: Serialize> From<ApiError> for ApiResponse<T> {
    fn from (err: ApiError) -> Self {
        ApiResponse {
            result: Err(err),
        }
    }
}

impl<'r, T: Serialize> Responder<'r> for ApiResponse<T> {
    fn respond_to(self, req: &Request) -> Result<Response<'r>, Status> {
        match self.result {
            Ok(res) => {
                json!(res).respond_to(req)
            },
            Err(err) => {
                err.respond_to(req)
            }
        }
    }
}

/// Fields returned from the API when an error occurs.
pub struct ApiErrorResponse {
    body: ApiErrorResponseBody,
    status: Status,
}

pub type ApiErrorResponseResult<'r> = Result<ApiErrorResponse, Status>;

impl<'r> From<TitanDatabaseError> for ApiErrorResponseResult<'r> {
    fn from(err: TitanDatabaseError) -> Self {
        match err {
            TitanDatabaseError::DieselError(db_error) => {
                if db_error == DieselError::NotFound {
                    return Err(Status::NotFound);
                }

                Ok(ApiErrorResponse {
                    body: ApiErrorResponseBody {
                        code: 500,
                        description: "Internal server error".to_owned(),
                        message: Some(db_error.description().to_owned()),
                    },
                    status: Status::InternalServerError
                })
            },
            _ => Err(Status::InternalServerError),
        }
    }
}

#[derive(Debug, Serialize)]
pub struct ApiErrorResponseBody {
    /// HTTP status code
    pub code: i16,
    /// HTTP status description
    pub description: String,
    /// Describes the cause of an error. The contents of this message
    /// should be easily understood by the user and not expose
    /// sensitive details that may violate the security of the user
    /// or system.
    pub message: Option<String>,
}

/// Enumeration of error types that may be returned in a response
/// to client apps.
pub enum ApiError {
    AuthenticationError,
    TitanDatabaseError(TitanDatabaseError),
    ValidationError(&'static str),
}

impl<'r> Responder<'r> for ApiError {
    /// Implementation of Rocket's `Responder`. Converts API errors to
    /// a user-friendly JSON structure.
    fn respond_to(self, _: &Request) -> Result<Response<'r>, Status> {
        let result = match self {
            ApiError::AuthenticationError => Err(Status::Unauthorized),
            ApiError::TitanDatabaseError(err) =>
                ApiErrorResponseResult::from(err),
            ApiError::ValidationError(err) => Ok(ApiErrorResponse {
                body: ApiErrorResponseBody {
                    code: 400,
                    description: "Invalid input".to_owned(),
                    message: Some(err.to_owned()),
                },
                status: Status::BadRequest,
            })
        };

        match result {
            Ok(res) => {
                match serde_json::to_string(&res.body) {
                    Ok(json) => {
                        Response::build()
                            .sized_body(Cursor::new(json))
                            .header(ContentType::new("application", "json"))
                            .status(res.status)
                            .ok()
                    },
                    _ => Err(Status::InternalServerError)
                }

            },
            Err(err) => {
                Err(err)
            }
        }
    }
}

impl<'r> From<TitanDatabaseError> for ApiError {
    fn from(err: TitanDatabaseError) -> Self {
        ApiError::TitanDatabaseError(err)
    }
}
