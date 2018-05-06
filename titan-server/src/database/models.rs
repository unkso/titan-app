use database::schema::roster_member;

#[derive(Serialize, Deserialize, Queryable)]
pub struct RosterMember {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password: String
}

#[table_name = "roster_member"]
#[derive(Serialize, Deserialize, Insertable)]
pub struct NewRosterMember {
    pub username: String,
    pub email: String,
    pub password: String
}