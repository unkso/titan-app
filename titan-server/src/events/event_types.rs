use diesel::{prelude::*, MysqlConnection};

use crate::models;
use crate::schema;
use crate::db;

/// Queries a single event type with the given id.
pub fn find_by_id(id: i32, titan_db: &MysqlConnection) -> db::TitanQueryResult<models::EventType> {
    schema::event_types::table
        .find(id)
        .first::<models::EventType>(titan_db)
        .map_err(db::TitanDatabaseError::from)
}

/// Queries all event types.
pub fn find_all(
    titan_db: &MysqlConnection
) -> db::TitanQueryResult<Vec<models::EventType>> {
    schema::event_types::table
        .order_by(schema::event_types::name.asc())
        .get_results(titan_db)
        .map_err(db::TitanDatabaseError::from)
}
