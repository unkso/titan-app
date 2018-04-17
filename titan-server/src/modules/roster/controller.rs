use rocket_contrib::Json;
use database::DbConn;
// use diesel;
// use diesel::prelude::*;
use database::models::{RosterMember, NewRosterMember};
// use database::schema::roster_member;

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

#[post("/roster/member", data="<roster_member2>")]
pub fn create_member(conn: DbConn, roster_member2: Json<NewRosterMember>) -> Json<NewRosterMember> {
    // use database::schema::roster_member;
    // diesel::insert_into(RosterMember::table).values(roster_member);
    roster_member2
}