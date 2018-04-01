use common::structures::roster_member::RosterMember;
use rocket_contrib::Json;
use database::DbConn;

#[get("/roster")]
pub fn get_roster() -> Json {
    Json(json!([
        RosterMember {
            username: "MParsons".to_string(),
            email: "mparsons@unkso.com".to_string(),
            password: "NotMyPassword".to_string()
        },
        RosterMember {
            username: "MParsons".to_string(),
            email: "mparsons@unkso.com".to_string(),
            password: "NotMyPassword".to_string()
        },
        RosterMember {
            username: "MParsons".to_string(),
            email: "mparsons@unkso.com".to_string(),
            password: "NotMyPassword".to_string()
        }
    ]))
}

#[post("/roster/member", data="<rosterMember>")]
pub fn create_member(conn: DbConn, rosterMember: Json<RosterMember>) -> Json<RosterMember> {
    rosterMember
}