use rocket_contrib::databases::{database, diesel};

#[database("unkso_main_forums")]
pub struct UnksoMainForums(diesel::MysqlConnection);

#[database("titan_primary")]
pub struct TitanPrimary(diesel::MysqlConnection);
