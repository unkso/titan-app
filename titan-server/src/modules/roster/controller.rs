use rocket_contrib::Json;
use database::DbConn;
use diesel;
use diesel::prelude::*;
use database::models::{RosterMember, NewRosterMember};
use database::schema::roster_member;

#[get("/roster")]
pub fn get_roster(conn: DbConn) -> Json {
    let results = roster_member::table
        .order(roster_member::id.asc())
        .load::<RosterMember>(&*conn)
        .unwrap();

    Json(json!(results))
}

#[post("/roster/member", data="<member>")]
pub fn create_member(conn: DbConn, member: Json<NewRosterMember>) -> Json<NewRosterMember> {
    let m = NewRosterMember {
        ..member.into_inner()
    };

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