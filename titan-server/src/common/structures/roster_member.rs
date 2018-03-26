#[derive(Serialize, Deserialize)]
pub struct RosterMember {
    pub username: String,
    pub email: String,
    pub password: String
}