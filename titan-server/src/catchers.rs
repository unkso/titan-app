use rocket_contrib::json::Json;
use crate::api::ApiResponseBody;

#[catch(400)]
pub fn handle_400_bad_request(_: &rocket::Request) -> Json<ApiResponseBody> {
    Json(ApiResponseBody {
        message: "Invalid or malformed input".to_string(),
    })
}

#[catch(401)]
pub fn handle_401_unauthorized(_: &rocket::Request) -> Json<ApiResponseBody> {
    Json(ApiResponseBody {
        message: "Unauthorized or missing credentials".to_string(),
    })
}

#[catch(404)]
pub fn handle_404_not_found(_: &rocket::Request) -> Json<ApiResponseBody> {
    Json(ApiResponseBody {
        message: "Resource not found".to_string(),
    })
}

#[catch(500)]
pub fn handle_500_internal_server_error(_: &rocket::Request) -> Json<ApiResponseBody> {
    Json(ApiResponseBody {
        message: "Internal server error".to_string(),
    })
}
