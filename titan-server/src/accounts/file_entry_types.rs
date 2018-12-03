use models;
use schema;
use diesel::prelude::*;
use diesel::MysqlConnection;
use chrono;

/// Queries a single file entry type with the given id.
pub fn find_by_id(
    file_entry_type_id: i32,
    titan_primary: &MysqlConnection
) -> QueryResult<models::UserFileEntryType> {
    return schema::user_file_entry_types::table
        .find(file_entry_type_id)
        .first::<models::UserFileEntryType>(titan_primary);
}