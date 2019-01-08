use models;
use schema;
use diesel::prelude::*;
use diesel::MysqlConnection;
use super::file_entry_types;

/// Queries a single organization with the given slug.
pub fn find_by_user(
    user_id: i32,
    titan_primary: &MysqlConnection
) -> Result<Vec<models::UserFileEntryWithType>, diesel::result::Error> {
    let file_entries_res = schema::user_file_entries::table
        .inner_join(schema::user_file_entry_types::table)
        .select((
            schema::user_file_entries::all_columns,
            schema::user_file_entry_types::all_columns
        ))
        .filter(schema::user_file_entries::user_id.eq(user_id))
        .order_by(schema::user_file_entries::start_date.desc())
        .get_results::<(models::UserFileEntry, models::UserFileEntryType)>(titan_primary)?;

    let mut file_entries: Vec<models::UserFileEntryWithType> = vec![];
    for entry in file_entries_res {
        file_entries.push(models::UserFileEntryWithType {
            id: entry.0.id,
            file_entry_type: entry.1,
            user_id: entry.0.user_id,
            start_date: entry.0.start_date,
            end_date: entry.0.end_date,
            comments: entry.0.comments,
            date_modified: entry.0.date_modified,
            modified_by: entry.0.modified_by
        });
    }

    Ok(file_entries)
}

/// Queries the last inserted file entry.
pub fn find_most_recent(
    titan_db: &MysqlConnection
) -> Result<models::UserFileEntry, diesel::result::Error> {
    schema::user_file_entries::table
        .order_by(schema::user_file_entries::id.desc())
        .first(titan_db)
}

/// Creates a new file entry.
pub fn create_file_entry(
    new_file_entry: &models::NewUserFileEntry,
    titan_db: &MysqlConnection
) -> Result<models::UserFileEntryWithType, diesel::result::Error> {
    diesel::insert_into(schema::user_file_entries::table)
        .values(new_file_entry)
        .execute(titan_db)?;

    let last_inserted = find_most_recent(titan_db)?;
    let entry_type = file_entry_types::find_by_id(
        last_inserted.user_file_entry_type_id,
        titan_db
    )?;

    Ok(models::UserFileEntryWithType {
        id: last_inserted.id,
        file_entry_type: entry_type,
        user_id: last_inserted.user_id,
        start_date: last_inserted.start_date,
        end_date: last_inserted.end_date,
        comments: last_inserted.comments,
        date_modified: last_inserted.date_modified,
        modified_by: last_inserted.modified_by
    })
}