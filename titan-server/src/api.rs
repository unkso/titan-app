use std::io::Cursor;
use crate::db::TitanDatabaseError;
use diesel::result::Error as DieselError;
use rocket::response::Responder;
use rocket::{Response, Request};
use rocket::http::{ContentType, Status};
use serde::{Serialize};
use rocket::response::content::Json as JsonResponse;

pub enum ApiError {
    CreationError,
    TitanDatabaseError(TitanDatabaseError),
}

#[derive(Serialize)]
pub struct ApiErrorResponse {
    message: String,
}

pub type ApiResponse<T> = Result<JsonResponse<T>, ApiError>;

impl<'r> Responder<'r> for ApiError {
    fn respond_to(self, _: &Request) -> Result<Response<'r>, Status> {
        let message: Result<&str, Status> = match self {
            ApiError::CreationError => Ok("Resource could not be created."),
            ApiError::TitanDatabaseError(error) => {
                match error {
                    TitanDatabaseError::DieselError(db_error) => {
                        if db_error == DieselError::NotFound {
                            return Err(Status::NotFound);
                        }

                        return Err(Status::InternalServerError)
                    },
                    _ => Err(Status::InternalServerError),
                }
            },
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
