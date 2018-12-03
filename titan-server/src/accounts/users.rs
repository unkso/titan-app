use models;
use schema;
use diesel::prelude::*;
use diesel::MysqlConnection;
use chrono;

/// Queries a single organization with the given slug.
pub fn find_by_wcf_id(
    wcf_id: i32,
    titan_primary: &MysqlConnection
) -> QueryResult<models::TitanUser> {
    return schema::titan_users::table
        .filter(schema::titan_users::wcf_id.eq(wcf_id))
        .first::<models::TitanUser>(titan_primary);
}

/// Create a user account from a WCF user if one doesn't already exist.
pub fn create_if_not_exists(
    wcf_user: &models::WcfUser,
    titan_primary: &MysqlConnection
) -> QueryResult<models::TitanUser> {
    let user = schema::titan_users::table
        .filter(schema::titan_users::wcf_id.eq(wcf_user.user_id))
        .first::<models::TitanUser>(titan_primary);

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

    let new_user = models::NewTitanUser {
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

    diesel::insert_into(schema::titan_users::table)
        .values(&new_user)
        .execute(titan_primary);

    find_by_wcf_id(wcf_user.user_id, titan_primary)
}