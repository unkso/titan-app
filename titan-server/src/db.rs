use rocket_contrib::databases::{database, diesel};

pub enum TitanDatabaseError {
    DieselError(diesel::result::Error),
    UnexpectedResultCountError(String),
}

impl From<diesel::result::Error> for TitanDatabaseError {
    fn from(err: diesel::result::Error) -> Self {
        TitanDatabaseError::DieselError(err)
    }
}

#[database("unkso_main_forums")]
pub struct UnksoMainForums(diesel::MysqlConnection);

#[database("titan_primary")]
pub struct TitanPrimary(diesel::MysqlConnection);
