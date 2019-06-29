use std::collections::VecDeque;
use diesel::prelude::*;

use crate::db::{UnksoMainForums, TitanPrimary};
use crate::models;
use crate::schema::{self, wcf1_user, wcf1_user_avatar, wcf1_user_to_group};

/// Queries a single organization with the given id.
pub fn find_by_id(
    id: i32,
    titan_db: &MysqlConnection
) -> QueryResult<models::Organization> {
    return schema::organizations::table
        .filter(schema::organizations::is_enabled.eq(true))
        .filter(schema::organizations::id.eq(id))
        .first::<models::Organization>(titan_db);
}

/// Queries a single organization with the given slug.
pub fn find_by_slug(
    slug: &str,
    unkso_titan: &TitanPrimary
) -> QueryResult<models::Organization> {
    return schema::organizations::table
        .filter(schema::organizations::is_enabled.eq(true))
        .filter(schema::organizations::slug.eq(slug))
        .first::<models::Organization>(&**unkso_titan);
}

/// Queries all the WCF users associated with an organization.
/// @deprecated
pub fn find_users_old(
    organization: &models::Organization,
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

/// Returns all organizations.
pub fn find_all(titan_primary: TitanPrimary) -> QueryResult<Vec<models::Organization>> {
    schema::organizations::table.load::<models::Organization>(&*titan_primary)
}

pub fn find_children(
    org_id: i32,
    titan_db: &MysqlConnection
) -> QueryResult<Vec<models::Organization>> {
    schema::organizations::table
        .filter(schema::organizations::parent_id.eq(org_id))
        .load::<models::Organization>(&*titan_db)
}

/// Returns the users belonging to an organization.
pub fn find_users(
    id: i32, children: bool, titan_db: &MysqlConnection)-> QueryResult<Vec<models::User>> {
    let child_ids =
        if children { find_children_ids(id, false, titan_db) } else { vec![id] };

    schema::users::table.inner_join(schema::organizations_users::table)
        .select(schema::users::all_columns)
        .filter(schema::organizations_users::organization_id.eq_any(child_ids))
        .order_by(schema::users::username.asc())
        .load::<(models::User)>(titan_db)
}

/// Returns true if a user is a non-leadership member of an
/// organization.
///
/// The user's role in the organization is not checked. Will return
/// true if the user is a member of a disabled organization.
pub fn is_user_organization_member(org_id: i32, user_id: i32, titan_db: &MysqlConnection) -> bool {
    let organization = schema::organizations_users::table
        .filter(schema::organizations_users::organization_id.eq(org_id))
        .filter(schema::organizations_users::user_id.eq(user_id))
        .first::<(models::OrganizationUser)>(titan_db);

    organization.is_ok()
}

/// Find all organizations where a user is a member, but does not
/// hold a leadership position.
///
/// Disabled organizations are excluded from the results.
pub fn find_all_by_user(
    user_id: i32,
    titan_db: &MysqlConnection
) -> QueryResult<Vec<models::UserOrganizationMembership>> {
    let mut orgs = schema::organizations_users::table
        .inner_join(schema::organizations::table)
        .select(schema::organizations::all_columns)
        .filter(schema::organizations::is_enabled.eq(true))
        .filter(schema::organizations_users::user_id.eq(user_id))
        .get_results::<(models::Organization)>(titan_db)?;

    let mut memberships: Vec<models::UserOrganizationMembership> = vec!();
    for org in orgs.drain(..) {
        memberships.push(models::UserOrganizationMembership {
            organization: org,
            role: None
        });
    }

    Ok(memberships)
}

/// Recursively queries the children of an organization and returns
/// their IDs.
///
/// The list of IDs will be ordered from closest relative to most
/// distant.
///
/// # Example
/// Consider the following hierarchy of organizations, where "(n)" is
/// an organization's ID.
///
/// ```ignore
/// Coast Guard (0)
///   > Squad 1 (1)
///   > Squad 2 (2)
///   > Comp Group (3)
///     > Group 1 (4)
///     > Group 2 (5)
/// ```
///
/// ```ignore
/// // Returns [1, 2, 3, 4, 5]
/// find_children_ids_recursive(0, titan_db);
/// ```
pub fn find_children_ids(id: i32, recursive: bool, titan_db: &MysqlConnection) -> Vec<i32> {
    let mut children_ids: Vec<i32> = vec![];
    let mut child_to_visit: VecDeque<i32> = VecDeque::new();
    child_to_visit.push_back(id);

    while !child_to_visit.is_empty() {
        let grandchild_orgs = schema::organizations::table
            .filter(schema::organizations::parent_id
                .eq_any(vec![child_to_visit.pop_front().unwrap()]))
            .get_results::<models::Organization>(titan_db);

        if grandchild_orgs.is_ok() {
            for grandchild in grandchild_orgs.unwrap().iter() {
                children_ids.push(grandchild.id);
                child_to_visit.push_back(grandchild.id);
            }
        }

        if !recursive {
            break;
        }
    }

    children_ids
}
