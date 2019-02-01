use diesel::prelude::*;

use crate::db::{UnksoMainForums, TitanPrimary};
use crate::models;
use crate::schema::{self, wcf1_user, wcf1_user_avatar, wcf1_user_to_group};

/// Queries a single organization with the given slug.
pub fn find_by_slug(
    slug: &str,
    unkso_titan: &TitanPrimary
) -> QueryResult<models::TitanOrganization> {
    return schema::organizations::table
        .filter(schema::organizations::is_enabled.eq(true))
        .filter(schema::organizations::slug.eq(slug))
        .first::<models::TitanOrganization>(&**unkso_titan);
}

/// Queries all the users associated with an organization.
pub fn find_users(
    organization: &models::TitanOrganization,
    unkso_main: &UnksoMainForums
) -> QueryResult<Vec<(models::WcfUser, models::WcfUserAvatar)>> {
    let users_query = wcf1_user_to_group::table
        .inner_join(
            wcf1_user::table.inner_join(wcf1_user_avatar::table)
        )
        .select((wcf1_user::all_columns, wcf1_user_avatar::all_columns))
        .filter(schema::wcf1_user_to_group::group_id.eq(organization.wcf_user_group_id));

    users_query.load::<(models::WcfUser, models::WcfUserAvatar)>(&**unkso_main)
}
