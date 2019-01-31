use diesel::{prelude::*, MysqlConnection};

use crate::models;
use crate::schema;

/// Queries a single file entry type with the given id.
pub fn find_by_id(
    file_entry_type_id: i32,
    titan_primary: &MysqlConnection
) -> QueryResult<models::UserFileEntryType> {
    return schema::user_file_entry_types::table
        .find(file_entry_type_id)
        .first::<models::UserFileEntryType>(titan_primary);
}

/// Queries all file entry types.
pub fn find_file_entry_types(
    titan_db: &MysqlConnection
) -> Result<Vec<models::UserFileEntryType>, diesel::result::Error> {
    schema::user_file_entry_types::table
        .order_by(schema::user_file_entry_types::name.asc())
        .get_results(titan_db)
}