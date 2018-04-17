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
pub struct NewRosterMember<'a> {
    pub username: &'a str,
    pub email: &'a str,
    pub password:& 'a str
}