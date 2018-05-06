//use diesel::prelude::*;
//use diesel::mysql::MysqlConnection;
use database::schema::roster_member;

#[table_name = "roster_member"]
#[derive(Serialize, Deserialize, Queryable, Insertable)]
pub struct RosterMember {
    pub username: String,
    pub email: String,
    pub password: String
}