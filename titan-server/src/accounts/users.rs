use chrono;
use diesel::{prelude::*, MysqlConnection};
use rocket::State;

use crate::models;
use crate::schema;
use crate::config;

pub fn search(
    username: Option<String>,
    limit: Option<u16>,
    titan_db: &MysqlConnection
) -> QueryResult<Option<Vec<models::User>>> {
    let max = limit.unwrap_or(25);
    let mut query = schema::users::table
        .limit(max as i64)
        .into_boxed();

    if let Some(username) = username {
        query = query.filter(schema::users::username.like(
            [username, "%".to_string()].join("")))
            .order_by(schema::users::username.asc());
    } else {
        query = query.order_by(schema::users::date_joined.desc())
    }

    query
        .get_results::<models::User>(titan_db)
        .optional()
}

/// Finds a single user by ID.
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
    schema::users::table
        .filter(schema::users::wcf_id.eq(wcf_id))
        .first::<models::User>(titan_primary)
}

/// Finds titan users with any of the WCF IDs.
pub fn find_all_by_wcf_id(
    wcf_ids: Vec<i32>,
    titan_primary: &MysqlConnection
) -> QueryResult<Vec<models::User>> {
    schema::users::table
        .filter(schema::users::wcf_id.eq_any(wcf_ids))
        .order_by(schema::users::username.asc())
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

    if let Ok(user) = user {
        return Ok(user);
    }

    let rank_delimiter = wcf_user.username.find('.');

    let first_username_char_pos = if let Some(rank_delimiter) = rank_delimiter {
        rank_delimiter + 1
    } else {
        0
    };

    let clan_tag_suffix = wcf_user.username.rfind("=US=");

    let clan_tag_suffix_pos = if let Some(clan_tag_suffix) = clan_tag_suffix {
        clan_tag_suffix
    } else {
        wcf_user.username.len()
    };

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

pub fn wcf_find_all_by_user_id(wcf_user_ids: Vec<i32>, wcf_db: &MysqlConnection) -> QueryResult<Vec<models::WcfUser>> {
    schema::wcf1_user::table
        .filter(schema::wcf1_user::user_id.eq_any(wcf_user_ids))
        .order_by(schema::wcf1_user::username.desc())
        .load::<models::WcfUser>(wcf_db)
}

/// Queries a single WCF user with the given id.
pub fn wcf_find_by_user_id(
    wcf_user_id: i32,
    wcf_db: &MysqlConnection
) -> QueryResult<models::WcfUser> {
    schema::wcf1_user::table
        .filter(schema::wcf1_user::user_id.eq(wcf_user_id))
        .first::<models::WcfUser>(wcf_db)
}

pub fn wcf_find_user_avatar(
    wcf_id: i32,
    wcf_db: &MysqlConnection
) -> Result<models::WcfUserAvatar, diesel::result::Error> {
    schema::wcf1_user_avatar::table
        .filter(schema::wcf1_user_avatar::user_id.eq(wcf_id))
        .first(wcf_db)
}

/// Lists the profiles for the WCF users with one of the given user
/// IDs.
pub fn wcf_find_all_user_profiles_by_id(
    wcf_user_ids: Vec<i32>,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<Vec<models::WcfUserProfile>, diesel::result::Error> {
    let user = schema::wcf1_user::table
        .filter(schema::wcf1_user::user_id.eq_any(wcf_user_ids))
        .get_results::<models::WcfUser>(wcf_db)?;

    let mut wcf_user_profiles: Vec<models::WcfUserProfile> = vec!();
    for wcf_user in user {
        let avatar_res = wcf_find_user_avatar(wcf_user.user_id, wcf_db);
        let avatar_url = if let Ok(avatar_res) = avatar_res {
            Some(format!(
                "{}/{}",
                app_config.avatar_base_url,
                avatar_res.get_avatar_url()
            ))
        } else {
            None
        };

        wcf_user_profiles.push(models::WcfUserProfile {
            avatar_url,
            last_activity_time: wcf_user.last_activity_time,
            user_title: wcf_user.user_title,
            username: wcf_user.username
        });
    }

    Ok(wcf_user_profiles)
}

/// Finds a WCF user by their corresponding WCF ID.
pub fn wcf_find_user_profile_by_id(
    wcf_user_id: i32,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<models::WcfUserProfile, diesel::result::Error> {
    let profile = schema::wcf1_user::table
        .filter(schema::wcf1_user::user_id.eq(wcf_user_id))
        .first::<models::WcfUser>(wcf_db)?;
    let avatar_res = wcf_find_user_avatar(profile.user_id, wcf_db);
    let avatar_url = match avatar_res {
        Ok(avatar) => Some(format!(
            "{}/{}",
            app_config.avatar_base_url,
            avatar.get_avatar_url()
        )),
        _ => None
    };

    Ok(models::WcfUserProfile {
        avatar_url,
        last_activity_time: profile.last_activity_time,
        user_title: profile.user_title,
        username: profile.username
    })
}

/// Given a list of users, returns a list of objects containing the
/// titan and WCF profile for each user.
pub fn map_users_to_profile(
    users: &[models::User],
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<Vec<models::UserProfile>, diesel::result::Error> {
    users.iter().map(|user| {
        map_user_to_profile(&user, &wcf_db, &app_config)
    }).collect()
}

/// Given a user, returns an object containing the user's titan and
/// WCF profiles.
pub fn map_user_to_profile(
    user: &models::User,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) ->  Result<models::UserProfile, diesel::result::Error> {
    let wcf_profile_res = wcf_find_user_profile_by_id(
        user.wcf_id, wcf_db, app_config);

    // TODO Not all titan users have a corresponding WCF profile.
    //  If the profile isn't found, the fields are manually filled
    //  as accurately as possible. Long term, we should remove
    //  titan's dependency on WCF by syncing data across platforms
    //  to prevent brittle circumstances such as this.
    let wcf_profile = match wcf_profile_res {
        Ok(profile) => profile,
        _ => models::WcfUserProfile {
            avatar_url: None,
            username: user.username.clone(),
            user_title: "".to_string(),
            last_activity_time: match user.last_activity {
                Some(date) => date.timestamp(),
                _ => chrono::Utc::now().naive_utc().timestamp()
            }
        }
    };

    Ok(models::UserProfile {
        id: user.id,
        wcf_id: user.wcf_id,
        legacy_player_id: user.legacy_player_id,
        rank_id: user.rank_id,
        username: user.username.clone(),
        orientation: user.orientation,
        bct_e0: user.bct_e0,
        bct_e1: user.bct_e1,
        bct_e2: user.bct_e2,
        bct_e3: user.bct_e3,
        loa: user.loa,
        a15: user.a15,
        date_joined: user.date_joined,
        last_activity:user.last_activity.unwrap_or_else(||
            chrono::Utc::now().naive_utc()),
        wcf: wcf_profile
    })
}
