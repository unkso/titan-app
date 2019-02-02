use diesel::{prelude::*, MysqlConnection};

use crate::models;
use crate::schema;

pub fn get_user_acl(wcf_user_id: i32, wcf_db: &MysqlConnection) -> QueryResult<Vec<models::WcfAclOption>> {
    let mut acl_option_ids = schema::wcf1_user_to_group::table
        .inner_join(schema::wcf1_acl_option_to_group::table.on(
            schema::wcf1_acl_option_to_group::group_id.eq(
                schema::wcf1_user_to_group::group_id
            )
        ))
        .select(schema::wcf1_acl_option_to_group::option_id)
        .filter(schema::wcf1_user_to_group::user_id.eq(wcf_user_id))
        .filter(schema::wcf1_acl_option_to_group::option_value.eq(true))
        .group_by(schema::wcf1_acl_option_to_group::option_id)
        .load::<i32>(wcf_db)
        .expect("failed to load user group acl options");

    let mut user_acl_option_ids = schema::wcf1_acl_option_to_user::table
        .select(schema::wcf1_acl_option_to_user::option_id)
        .filter(schema::wcf1_acl_option_to_user::user_id.eq(wcf_user_id))
        .filter(schema::wcf1_acl_option_to_user::option_value.eq(true))
        .load::<i32>(wcf_db)
        .expect("failed to load user acl option ids");

    acl_option_ids.append(&mut user_acl_option_ids);
    acl_option_ids.sort_unstable();
    acl_option_ids.dedup();

    schema::wcf1_acl_option::table
        .filter(schema::wcf1_acl_option::id.eq_any(acl_option_ids))
        .load::<models::WcfAclOption>(wcf_db)
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
