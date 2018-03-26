use common::structures::roster_member::RosterMember;
use rocket_contrib::Json;

#[get("/clan-roster")]
pub fn get_clan_roster() -> Json<RosterMember> {
    Json(RosterMember {
        username: "MParsons".to_string(),
        email: "mparsons@unkso.com".to_string(),
        password: "NotMyPassword".to_string()
    })
}