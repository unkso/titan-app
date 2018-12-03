use models;
use schema;
use diesel::prelude::*;
use diesel::MysqlConnection;

/// Queries a single WCF user with the given id.
pub fn find_by_user_id(
    wcf_user_id: i32,
    unkso_forums: &MysqlConnection
) -> QueryResult<models::WcfUser> {
    return schema::wcf1_user::table
        .filter(schema::wcf1_user::user_id.eq(wcf_user_id))
        .first::<models::WcfUser>(unkso_forums);
}