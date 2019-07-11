use diesel::{prelude::*, MysqlConnection};
use rocket::State;

use crate::accounts;
use crate::config;
use crate::models;
use crate::schema;

/// Queries a single organization with the given slug.
pub fn find_by_user(
    user_id: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<Vec<models::UserFileEntryWithAssoc>, diesel::result::Error> {
    let file_entries = schema::user_file_entries::table
        .filter(schema::user_file_entries::user_id.eq(user_id))
        .order_by(schema::user_file_entries::start_date.desc())
        .get_results(titan_db)?;

    map_file_entries_assoc(file_entries, titan_db, wcf_db, app_config)
}

/// Queries the last inserted file entry.
pub fn find_most_recent(
    titan_db: &MysqlConnection
) -> Result<models::UserFileEntry, diesel::result::Error> {
    schema::user_file_entries::table
        .order_by(schema::user_file_entries::id.desc())
        .first(titan_db)
}

/// Find file entries belonging to one of the given organizations,
/// where the file entry start date is between two dates (inclusive).
pub fn find_by_orgs(
    org_ids: Vec<i32>,
    from_start_date: chrono::NaiveDateTime,
    to_start_date: chrono::NaiveDateTime,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> QueryResult<Vec<models::UserFileEntryWithAssoc>> {
    let entries = schema::user_file_entries::table
        .select(schema::user_file_entries::all_columns)
        .inner_join(schema::users::table
            .inner_join(schema::organizations_users::table))
        .filter(schema::organizations_users::organization_id
            .eq_any(&org_ids))
        .filter(schema::user_file_entries::start_date.ge(from_start_date))
        .filter(schema::user_file_entries::start_date.le(to_start_date))
        .load(titan_db)?;

    map_file_entries_assoc(entries, titan_db, wcf_db, app_config)
}

/// Creates a new file entry.
pub fn create_file_entry(
    new_file_entry: &models::NewUserFileEntry,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<models::UserFileEntryWithAssoc, diesel::result::Error> {
    diesel::insert_into(schema::user_file_entries::table)
        .values(new_file_entry)
        .execute(titan_db)?;

    let last_inserted = find_most_recent(titan_db)?;

    map_file_entry_assoc(last_inserted, titan_db, wcf_db, app_config)
}

pub fn map_file_entries_assoc(
    file_entries: Vec<models::UserFileEntry>,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<Vec<models::UserFileEntryWithAssoc>, diesel::result::Error> {
    file_entries.into_iter().map(|entry| {
        map_file_entry_assoc(entry, titan_db, wcf_db, app_config)
    }).collect()
}

pub fn map_file_entry_assoc(
    file_entry: models::UserFileEntry,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<models::UserFileEntryWithAssoc, diesel::result::Error> {
    let user = accounts::users::find_by_id(file_entry.user_id, titan_db)?;
    let user_profile = accounts::users::map_user_to_profile(
        user, wcf_db, app_config)?;
    let file_entry_type = accounts::file_entry_types::find_by_id(
        file_entry.user_file_entry_type_id, titan_db)?;
    let modified_by_user = accounts::users::find_by_id(file_entry.modified_by, titan_db);
    let modified_by_profile = accounts::users::map_user_to_profile(
        modified_by_user.unwrap(), wcf_db, app_config);

    Ok(models::UserFileEntryWithAssoc {
        id: file_entry.id,
        file_entry_type,
        user_profile,
        start_date: file_entry.start_date,
        end_date: file_entry.end_date,
        comments: file_entry.comments,
        date_modified: file_entry.date_modified,
        modified_by: modified_by_profile.unwrap()
    })
}
