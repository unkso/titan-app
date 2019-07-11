use diesel::{prelude::*, MysqlConnection};

use crate::models;
use crate::schema;

pub fn get_user_acl(wcf_user_id: i32, wcf_db: &MysqlConnection) -> QueryResult<Vec<models::WcfUserGroupOption>> {
    schema::wcf1_user_group_option::table
        .select((
            schema::wcf1_user_group_option::option_id,
            schema::wcf1_user_group_option::option_name,
            schema::wcf1_user_group_option::category_name,
        ))
        .inner_join(schema::wcf1_user_group_option_value::table
            .inner_join(schema::wcf1_user_group::table
                .inner_join(schema::wcf1_user_to_group::table)
            )
        )
        .filter(schema::wcf1_user_to_group::user_id.eq(wcf_user_id))
        .filter(schema::wcf1_user_group_option_value::option_value.ne("0"))
        .filter(schema::wcf1_user_group_option_value::option_value.ne(""))
        .filter(schema::wcf1_user_group_option::category_name.like("%titan%"))
        .group_by(schema::wcf1_user_group_option::option_id)
        .order_by(schema::wcf1_user_group_option::option_id)
        .load::<models::WcfUserGroupOption>(wcf_db)
}

/// Returns true a user has permission for the given ACL option.
pub fn has_acl_option(wcf_user_id: i32, option_name: &str, wcf_db: &MysqlConnection) -> bool {
    let options_res = get_user_acl(wcf_user_id, wcf_db);

    if options_res.is_ok() {
        let options = options_res.unwrap();
        for option in options {
            if option.option_name == option_name {
                return true;
            }
        }
    }

    false
}
