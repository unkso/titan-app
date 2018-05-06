use rocket_contrib::{Json, Value};
use database::DbConn;
use diesel;
use diesel::prelude::*;
use database::models::{RosterMember, NewRosterMember};
use database::schema::roster_member;
use serde_json;

#[get("/roster")]
pub fn get_roster() -> Json {
    Json(json!([
        RosterMember {
            id: 1,
            username: "MParsons".to_string(),
            email: "mparsons@unkso.com".to_string(),
            password: "NotMyPassword".to_string()
        },
        RosterMember {
            id: 2,
            username: "MParsons".to_string(),
            email: "mparsons@unkso.com".to_string(),
            password: "NotMyPassword".to_string()
        },
        RosterMember {
            id: 3,
            username: "MParsons".to_string(),
            email: "mparsons@unkso.com".to_string(),
            password: "NotMyPassword".to_string()
        }
    ]))
}

#[post("/roster/member", data="<member>")]
pub fn create_member(conn: DbConn, member: Json<NewRosterMember>) -> Json<NewRosterMember> {
    let m = NewRosterMember {
        ..member.into_inner()
    };

    // let r: NewRosterMember
    diesel::insert_into(roster_member::table)
        .values(m)
        .execute(&*conn)
        .expect("Error creating roster member.");

    Json(NewRosterMember {
        username: "test".to_string(),
        password: "test".to_string(),
        email: "test".to_string()
    })
}