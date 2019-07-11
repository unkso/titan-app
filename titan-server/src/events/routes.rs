use rocket::{get, response::status};
use rocket_contrib::json::Json;

use crate::db::{TitanPrimary};
use crate::models;
use super::event_types;

#[get("/event-types")]
pub fn list_event_types(titan_db: TitanPrimary) -> Json<Vec<models::EventType>> {
    Json(event_types::find_all(&*titan_db).unwrap())
}

#[get("/event-types/<event_type_id>")]
pub fn get_event_type_by_id(
    event_type_id: i32,
    titan_db: TitanPrimary
) -> Result<Json<models::EventType>, status::NotFound<String>> {
    let event_type = event_types::find_by_id(event_type_id, &*titan_db);

    if event_type.is_err() {
        return Err(status::NotFound("".to_string()));
    }

    Ok(Json(event_type.unwrap()))
}
