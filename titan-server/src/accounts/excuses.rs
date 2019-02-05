use diesel::{prelude::*, MysqlConnection};

use crate::models;
use crate::schema;

/// Queries all of a user's excuses.
pub fn get_user_excuses(
    user_id: i32,
    titan_db: &MysqlConnection
) -> Result<Vec<models::UserEventExcuseWithType>, diesel::result::Error> {
    let excuses = schema::user_event_excuses::table
        .inner_join(schema::event_types::table)
        .select((
            schema::user_event_excuses::all_columns,
            schema::event_types::all_columns
        ))
        .filter(schema::user_event_excuses::user_id.eq(user_id))
        .order_by(schema::user_event_excuses::event_date.desc())
        .get_results::<(models::UserEventExcuse, models::EventType)>(titan_db)?;



    Ok(map_excuses_with_type(excuses))
}

/// Queries the last inserted event excuse.
pub fn find_most_recent(
    titan_db: &MysqlConnection
) -> Result<models::UserEventExcuseWithType, diesel::result::Error> {
    let excuse = schema::user_event_excuses::table
        .inner_join(schema::event_types::table)
        .select((
            schema::user_event_excuses::all_columns,
            schema::event_types::all_columns
        ))
        .order_by(schema::user_event_excuses::id.desc())
        .first(titan_db)?;

    Ok(map_excuse_with_type(excuse))
}

/// Creates a new event excuse.
pub fn create_event_excuse(
    new_event_excuse: &models::NewUserEventExcuse,
    titan_db: &MysqlConnection
) -> Result<models::UserEventExcuseWithType, diesel::result::Error> {
    diesel::insert_into(schema::user_event_excuses::table)
        .values(new_event_excuse)
        .execute(titan_db)?;

    find_most_recent(titan_db)
}

fn map_excuses_with_type(
    excuses: Vec<(models::UserEventExcuse, models::EventType)>
) -> Vec<models::UserEventExcuseWithType> {
    let mut excuses_with_type: Vec<models::UserEventExcuseWithType> = vec![];
    for excuse in excuses {
        excuses_with_type.push(models::UserEventExcuseWithType {
            id: excuse.0.id,
            user_id: excuse.0.id,
            event_type: excuse.1,
            event_date: excuse.0.event_date,
            comments: excuse.0.comments,
            ack_user_id: excuse.0.ack_user_id,
            ack_date: excuse.0.ack_date,
            ack_comments: excuse.0.ack_comments,
            date_created: excuse.0.date_created,
            date_modified: excuse.0.date_modified
        });
    }

    excuses_with_type
}

fn map_excuse_with_type(
    excuse: (models::UserEventExcuse, models::EventType)
) -> models::UserEventExcuseWithType {
    models::UserEventExcuseWithType {
        id: excuse.0.id,
        user_id: excuse.0.id,
        event_type: excuse.1,
        event_date: excuse.0.event_date,
        comments: excuse.0.comments,
        ack_user_id: excuse.0.ack_user_id,
        ack_date: excuse.0.ack_date,
        ack_comments: excuse.0.ack_comments,
        date_created: excuse.0.date_created,
        date_modified: excuse.0.date_modified
    }
}