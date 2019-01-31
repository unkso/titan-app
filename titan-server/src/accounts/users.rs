use chrono;
use diesel::{prelude::*, MysqlConnection};

use crate::models;
use crate::schema;

/// Finds a single user by ID
pub fn find_by_id(
    user_id: i32,
    titan_db: &MysqlConnection
) -> Result<models::User, diesel::result::Error> {
    schema::users::table.find(user_id).first(titan_db)
}

/// Finds a user with the given WCF id.
pub fn find_by_wcf_id(
    wcf_id: i32,
    titan_primary: &MysqlConnection
) -> QueryResult<models::User> {
    return schema::users::table
        .filter(schema::users::wcf_id.eq(wcf_id))
        .first::<models::User>(titan_primary);
}

/// Finds all user IDs by a list of WCF IDs.
pub fn find_all_by_wcf_id(wcf_ids: Vec<i32>, titan_primary: &MysqlConnection) -> QueryResult<Vec<models::User>> {
    schema::users::table
        .filter(schema::users::wcf_id.eq_any(wcf_ids))
        .load::<models::User>(titan_primary)
}

/// Create a user account from a WCF user if one doesn't already exist.
pub fn create_if_not_exists(
    wcf_user: &models::WcfUser,
    titan_primary: &MysqlConnection
) -> QueryResult<models::User> {
    let user = schema::users::table
        .filter(schema::users::wcf_id.eq(wcf_user.user_id))
        .first::<models::User>(titan_primary);

    if user.is_ok() {
        return Ok(user.unwrap());
    }

    let rank_delimiter = wcf_user.username.find('.');
    let mut first_username_char_pos = 0;

    if rank_delimiter.is_some() {
        first_username_char_pos = rank_delimiter.unwrap() + 1;
    }

    let clan_tag_suffix = wcf_user.username.rfind("=US=");
    let mut clan_tag_suffix_pos = wcf_user.username.len();

    if clan_tag_suffix.is_some() {
        clan_tag_suffix_pos = clan_tag_suffix.unwrap()
    }

    let new_user = models::NewUser {
        wcf_id: wcf_user.user_id,
        legacy_player_id: None,
        rank_id: None,
        // Strip rank and clan tags from username.
        username: wcf_user.username[first_username_char_pos..clan_tag_suffix_pos].to_string(),
        orientation: None,
        bct_e0: None,
        bct_e1: None,
        bct_e2: None,
        bct_e3: None,
        loa: None,
        a15: None,
        date_joined: None,
        date_created: chrono::Utc::now().naive_utc(),
        date_modified: None,
        modified_by: None,
        last_activity: chrono::Utc::now().naive_utc(),
        is_active: true
    };

    diesel::insert_into(schema::users::table)
        .values(&new_user)
        .execute(titan_primary)?;

    find_by_wcf_id(wcf_user.user_id, titan_primary)
}

/// Queries a single WCF user with the given id.
pub fn wcf_find_by_user_id(
    wcf_user_id: i32,
    wcf_db: &MysqlConnection
) -> QueryResult<models::WcfUser> {
    return schema::wcf1_user::table
        .filter(schema::wcf1_user::user_id.eq(wcf_user_id))
        .first::<models::WcfUser>(wcf_db);
}

pub fn find_user_avatar(
    wcf_id: i32,
    wcf_db: &MysqlConnection
) -> Result<models::WcfUserAvatar, diesel::result::Error> {
    schema::wcf1_user_avatar::table
        .filter(schema::wcf1_user_avatar::user_id.eq(wcf_id))
        .first(wcf_db)
}
