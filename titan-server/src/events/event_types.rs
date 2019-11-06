use diesel::{prelude::*, MysqlConnection};

use crate::models;
use crate::schema;

/// Queries a single event type with the given id.
pub fn find_by_id(id: i32, titan_db: &MysqlConnection) -> QueryResult<models::EventType> {
    schema::event_types::table
        .find(id)
        .first::<models::EventType>(titan_db)
}

/// Queries all event types.
pub fn find_all(
    titan_db: &MysqlConnection
) -> Result<Vec<models::EventType>, diesel::result::Error> {
    schema::event_types::table
        .order_by(schema::event_types::name.asc())
        .get_results(titan_db)
}
