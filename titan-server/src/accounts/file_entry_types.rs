use diesel::{prelude::*, MysqlConnection};

use crate::models;
use crate::schema;
use crate::db;

/// Queries a single file entry type with the given id.
pub fn find_by_id(
    file_entry_type_id: i32,
    titan_primary: &MysqlConnection
) -> db::TitanQueryResult<models::UserFileEntryType> {
    schema::user_file_entry_types::table
        .find(file_entry_type_id)
        .first::<models::UserFileEntryType>(titan_primary)
        .map_err(db::TitanDatabaseError::from)
}

/// Queries all file entry types.
pub fn find_file_entry_types(
    titan_db: &MysqlConnection
) -> db::TitanQueryResult<Vec<models::UserFileEntryType>> {
    schema::user_file_entry_types::table
        .order_by(schema::user_file_entry_types::name.asc())
        .get_results(titan_db)
        .map_err(db::TitanDatabaseError::from)
}
