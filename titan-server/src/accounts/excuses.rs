use diesel::{prelude::*, MysqlConnection};
use rocket::State;

use crate::models;
use crate::schema;
use crate::accounts;
use crate::config;
use crate::db;

/// Queries all of a user's excuses.
pub fn get_user_excuses(
    user_id: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> db::TitanQueryResult<Vec<models::UserEventExcuseWithAssoc>> {
    let excuses = schema::user_event_excuses::table
            .filter(schema::user_event_excuses::user_id.eq(user_id))
        .order_by(schema::user_event_excuses::event_date.desc())
        .get_results(titan_db)?;

    map_excuses_assoc(excuses, titan_db, wcf_db, app_config)
}

/// Queries an excuse with the given ID.
pub fn find_by_id(
    excuse_id: i32,
    titan_db: &MysqlConnection
) -> db::TitanQueryResult<models::UserEventExcuse> {
    schema::user_event_excuses::table
        .find(excuse_id)
        .first(titan_db)
        .map_err(db::TitanDatabaseError::from)
}

/// Queries the last inserted event excuse.
pub fn find_last_inserted(
    titan_db: &MysqlConnection
) -> db::TitanQueryResult<models::UserEventExcuse> {
    let excuse = schema::user_event_excuses::table
        .order_by(schema::user_event_excuses::id.desc())
        .first(titan_db)
        .map_err(db::TitanDatabaseError::from)?;

    Ok(excuse)
}

pub fn find_all_unacknowledged(
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> db::TitanQueryResult<Vec<models::UserEventExcuseWithAssoc>> {
    let excuses = schema::user_event_excuses::table
        .filter(schema::user_event_excuses::ack_date.is_null())
        .order_by(schema::user_event_excuses::event_date.desc())
        .get_results(titan_db)
        .map_err(db::TitanDatabaseError::from)?;

    map_excuses_assoc(excuses, titan_db, wcf_db, app_config)
}

/// Creates a new event excuse.
pub fn create_event_excuse(
    new_event_excuse: &models::NewUserEventExcuse,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> db::TitanQueryResult<models::UserEventExcuseWithAssoc> {
    diesel::insert_into(schema::user_event_excuses::table)
        .values(new_event_excuse)
        .execute(titan_db)
        .map_err(db::TitanDatabaseError::from)?;

    let excuse = find_last_inserted(titan_db)?;
    map_excuse_assoc(excuse, titan_db, wcf_db, app_config)
}

pub fn ack_event_excuse(
    excuse_id: i32,
    ack_user: &models::User,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> db::TitanQueryResult<models::UserEventExcuseWithAssoc> {
    let mut excuse = find_by_id(excuse_id, titan_db)?;

    excuse.ack_user_id = Some(ack_user.id);
    excuse.ack_date = Some(chrono::Utc::now().naive_utc());

    diesel::update(&excuse)
        .set((
            schema::user_event_excuses::ack_user_id.eq(&Some(ack_user.id)),
            schema::user_event_excuses::ack_date.eq(&Some(chrono::Utc::now().naive_utc()))
        ))
        .execute(titan_db)?;

    map_excuse_assoc(excuse, titan_db, wcf_db, app_config)
}

pub fn map_excuses_assoc(
    mut excuses: Vec<models::UserEventExcuse>,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> db::TitanQueryResult<Vec<models::UserEventExcuseWithAssoc>> {
    let mut excuses_with_assoc: Vec<models::UserEventExcuseWithAssoc> = vec!();
    for excuse in excuses.drain(..) {
        excuses_with_assoc.push(map_excuse_assoc(
            excuse, titan_db, wcf_db, app_config)?)
    }

    Ok(excuses_with_assoc)
}

fn map_excuse_assoc(
    excuse: models::UserEventExcuse,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> db::TitanQueryResult<models::UserEventExcuseWithAssoc> {
    let event_type = schema::event_types::table
        .find(excuse.event_type_id)
        .first(titan_db)
        .map_err(db::TitanDatabaseError::from)?;
    let excuse_user = accounts::users::map_user_to_profile(
        &accounts::users::find_by_id(excuse.user_id, titan_db)?,
        wcf_db, app_config)?;
    let excuse_ack_user_profile: Option<models::UserProfile> = if excuse.ack_user_id.is_some() {
        let ack_user = accounts::users::find_by_id(
            excuse.ack_user_id.unwrap(), titan_db)?;

        Some(accounts::users::map_user_to_profile(
            &ack_user, wcf_db, app_config)?)
    } else {
        None
    };

    Ok(models::UserEventExcuseWithAssoc {
        id: excuse.id,
        user: excuse_user,
        event_type,
        event_date: excuse.event_date,
        comments: excuse.comments,
        ack_user: excuse_ack_user_profile,
        ack_date: excuse.ack_date,
        ack_comments: excuse.ack_comments,
        date_created: excuse.date_created,
        date_modified: excuse.date_modified
    })
}
