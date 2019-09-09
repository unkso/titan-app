use rocket_contrib::json::Json;
use crate::api::ApiErrorResponseBody;

#[catch(400)]
pub fn handle_400_bad_request(_: &rocket::Request) -> Json<ApiErrorResponseBody> {
    Json(ApiErrorResponseBody {
        code: 400,
        description: "Invalid or malformed input".to_owned(),
        message: None,
    })
}

#[catch(401)]
pub fn handle_401_unauthorized(_: &rocket::Request) -> Json<ApiErrorResponseBody> {
    Json(ApiErrorResponseBody {
        code: 401,
        description: "Unauthorized or missing credentials".to_owned(),
        message: None,
    })
}

#[catch(404)]
pub fn handle_404_not_found(_: &rocket::Request) -> Json<ApiErrorResponseBody> {
    Json(ApiErrorResponseBody {
        code: 404,
        description: "Resource not found".to_owned(),
        message: None,
    })
}

#[catch(500)]
pub fn handle_500_internal_server_error(_: &rocket::Request) -> Json<ApiErrorResponseBody> {
    Json(ApiErrorResponseBody {
        code: 500,
        description: "Internal server error".to_owned(),
        message: None,
    })
}
