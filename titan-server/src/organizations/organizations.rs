use models;
use schema;
use schema::wcf1_user_to_group;
use schema::wcf1_user;
use schema::wcf1_user_avatar;
use diesel::prelude::*;
use diesel::MysqlConnection;

pub fn find_by_id(id: i32, titan_db: &MysqlConnection) -> QueryResult<models::TitanOrganization> {
    schema::organizations::table.find(id)
        .first::<models::TitanOrganization>(titan_db)
}

pub fn find_by_path(
    group_type: &String,
    path: &Vec<&str>,
    titan_db: &MysqlConnection
) -> Option<models::TitanOrganization> {
    let mut wrapped_org: Option<models::TitanOrganization> = None;
    let mut parent_id = -1;

    for (i, slug) in path.iter().enumerate() {
        let mut query = schema::organizations::table
            .filter(schema::organizations::is_enabled.eq(true))
            .filter(schema::organizations::slug.eq(slug.to_string()))
            .into_boxed();

        if i == 0 {
            // Query the to level parent organization.
            query = query.filter(schema::organizations::group_type.eq(group_type));
        } else {
            // Query a child organization.
            query = query.filter(schema::organizations::parent_id.eq(parent_id));
        }

        let res = query.first::<models::TitanOrganization>(titan_db);

        if res.is_ok() {
            let org = res.unwrap();
            parent_id = org.id;
            wrapped_org = Some(org);
        } else {
            return None
        }
    }

    return wrapped_org;
}

/// Queries all the users associated with an organization.
pub fn find_users(
    id: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection
) -> QueryResult<Vec<(models::WcfUser, models::WcfUserAvatar)>> {
    let organization = find_by_id(id, titan_db)?;

    let users_query = wcf1_user_to_group::table
        .inner_join(
            wcf1_user::table.inner_join(wcf1_user_avatar::table)
        )
        .select((wcf1_user::all_columns, wcf1_user_avatar::all_columns))
        .filter(schema::wcf1_user_to_group::group_id.eq(organization.wcf_user_group_id));

    users_query.load::<(models::WcfUser, models::WcfUserAvatar)>(wcf_db)
}