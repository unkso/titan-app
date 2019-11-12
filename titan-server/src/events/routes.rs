use rocket::get;

use crate::db::{TitanPrimary};
use crate::models;
use super::event_types;
use crate::api::ApiResponse;

#[get("/event-types")]
pub fn list_event_types(titan_db: TitanPrimary) -> ApiResponse<Vec<models::EventType>> {
    ApiResponse::from(event_types::find_all(&*titan_db))
}

#[get("/event-types/<event_type_id>")]
pub fn get_event_type_by_id(
    event_type_id: i32,
    titan_db: TitanPrimary
) -> ApiResponse<models::EventType> {
    ApiResponse::from(event_types::find_by_id(event_type_id, &*titan_db))
}
