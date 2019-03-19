use diesel::prelude::*;
use rocket::State;

use crate::models;
use crate::schema;
use crate::accounts;
use crate::organizations;
use crate::config;

/// Queries all the roles belonging to an organization.
///
/// Will still return results if the organization is disabled.
pub fn find_all_by_organization(
    organization_id: i32,
    titan_db: &MysqlConnection
) -> QueryResult<Vec<models::OrganizationRole>> {
    schema::organization_roles::table
        .filter(schema::organization_roles::organization_id.eq(organization_id))
        .get_results::<models::OrganizationRole>(titan_db)
}

/// Given a list of organization roles, loads the user profile for
/// each role (if present) and returns a new object containing the
/// original role and the full user profile.
pub fn map_roles_to_users(
    roles: Vec<models::OrganizationRole>,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: State<config::AppConfig>
) -> QueryResult<Vec<models::OrganizationRoleWithUser>> {
    let mut roles_with_users: Vec<models::OrganizationRoleWithUser> = vec!();
    for role in roles {
        let user_profile: Option<models::UserProfile>;
        if role.user_id.is_some() {
            let user = accounts::users::find_by_id(
                role.user_id.unwrap(), titan_db).unwrap();
            user_profile = Some(accounts::users::map_user_to_profile(
                user, wcf_db, &app_config)?)
        } else {
            user_profile = None;
        }

        roles_with_users.push(models::OrganizationRoleWithUser {
            id: role.id,
            organization_id: role.organization_id,
            user_profile,
            role: role.role,
            rank: role.rank
        });
    }

    Ok(roles_with_users)
}

/// Finds the next user with ranking authority over the given rank.
///
/// Only roles within the organization will be queried. Parent
/// organizations will not be checked for higher ranking users.
pub fn find_next_local_org_coc(
    org_id: i32,
    rank: i32,
    titan_db: &MysqlConnection
) -> QueryResult<models::OrganizationRole> {
    schema::organization_roles::table
        .filter(schema::organization_roles::organization_id.eq(org_id))
        .filter(schema::organization_roles::rank.lt(rank))
        .filter(schema::organization_roles::user_id.is_not_null())
        .order_by(schema::organization_roles::rank.desc())
        .first::<models::OrganizationRole>(titan_db)
}

/// Lists all the organizations where a user holds a leadership
/// position.
///
/// Only enabled organizations will be included in the list. Does not
/// include organizations where the user is a standard member.
pub fn find_all_by_user(
    user_id: i32,
    titan_db: &MysqlConnection
) -> QueryResult<Vec<models::UserOrganizationMembership>> {
    let mut results = schema::organization_roles::table
        .inner_join(schema::organizations::table)
        .select((schema::organizations::all_columns, schema::organization_roles::all_columns))
        .filter(schema::organizations::is_enabled.eq(true))
        .filter(schema::organization_roles::user_id.eq(user_id))
        .get_results::<(models::Organization, models::OrganizationRole)>(titan_db)?;

    let mut memberships: Vec<models::UserOrganizationMembership> = vec!();
    for result in results.drain(..) {
        memberships.push(models::UserOrganizationMembership {
            organization: result.0,
            role: Some(result.1)
        });
    }

    Ok(memberships)
}

/// Finds a user's role within a specific organization.
///
/// Returns an empty query result if the user does not hold a
/// leadership role in the organization.
pub fn find_org_role_by_user_id(
    org_id: i32,
    user_id: i32,
    titan_db: &MysqlConnection
) -> QueryResult<models::OrganizationRole> {
    schema::organization_roles::table
        .filter(schema::organization_roles::organization_id.eq(org_id))
        .filter(schema::organization_roles::user_id.eq(user_id))
        .first(titan_db)
}

/// Queries a user's complete chain of a command for a given
/// organization by recursively searching for higher ranking users in
/// the current and parent organizations until there are no more to
/// search.
///
/// If the user does not belong to the organization or has no higher
/// ranking user above them, an empty list will be returned. The query
/// determines if the user is a standard member or a leader in the
/// organization, then uses those details as a basis for calculating
/// the CoC.
pub fn find_user_coc(
    org_id: i32,
    user_id: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: State<config::AppConfig>
) -> Result<models::ChainOfCommand, diesel::result::Error> {
    let role_res = find_org_role_by_user_id(org_id, user_id, titan_db);
    let mut rank: i32;

    if role_res.is_ok() {
        let role = role_res.unwrap();
        rank = if role.rank.is_some() {
            role.rank.unwrap()
        } else {
            std::i32::MAX
        };
    } else {
        rank = std::i32::MAX
    }

    find_org_coc(org_id, rank, titan_db, wcf_db, &app_config)
}

/// Queries an organization's CoC.
///
/// ## Deriving the next user in CoC
/// If a user holds a role in the initial organization, search the
/// current organization for a user with a lower value for `rank`.
///
/// If no such user is found or the user does not hold a leadership
/// role, set the user's rank to the maximum i32 value, then query
/// the or parent organization(s) for a user with the highest value
/// for `rank`. The higher rank value indicates that user holds the
/// lowest authority in the parent organization.
pub fn find_org_coc(
    org_id: i32,
    starting_rank: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<models::ChainOfCommand, diesel::result::Error>{
    let mut extended_coc: Vec<models::OrganizationRoleWithAssoc> = vec!();
    let mut local_coc: Vec<models::OrganizationRoleWithAssoc> = vec!();
    let mut internal_org_id = org_id;
    let mut organization: models::Organization;
    let mut rank = starting_rank;

    while internal_org_id != std::i32::MAX {
        organization = organizations::organizations::find_by_id(
            internal_org_id, titan_db)?;
        let superior_role_res =
            find_next_local_org_coc(internal_org_id, rank, titan_db);

        if superior_role_res.is_ok() {
            let superior_role = superior_role_res.unwrap();
            let superior_rank = superior_role.rank;

            let coc_entry = map_role_assoc(
                superior_role, titan_db, wcf_db, app_config)?;

            if coc_entry.organization.id == org_id {
                local_coc.push(coc_entry);
            } else {
                extended_coc.push(coc_entry);
            }

            rank = superior_rank.unwrap();
        } else if organization.parent_id.is_some() {
            internal_org_id = organization.parent_id.unwrap();
            rank = std::i32::MAX;
        } else {
            internal_org_id = std::i32::MAX;
        }
    }

    Ok(models::ChainOfCommand {
        extended_coc,
        local_coc
    })
}

pub fn find_unranked_roles(
    org_id: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<Vec<models::OrganizationRoleWithAssoc>, diesel::result::Error>{
    let roles = schema::organization_roles::table
        .filter(schema::organization_roles::organization_id.eq(org_id))
        .filter(schema::organization_roles::rank.is_null())
        .get_results::<models::OrganizationRole>(titan_db)?;

    map_roles_assoc(roles, titan_db, wcf_db, app_config)
}

pub fn map_roles_assoc(
    roles: Vec<models::OrganizationRole>,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<Vec<models::OrganizationRoleWithAssoc>, diesel::result::Error> {
    roles.into_iter().map(|role| {
        map_role_assoc(role, titan_db, wcf_db, app_config)
    }).collect()
}

pub fn map_role_assoc(
    role: models::OrganizationRole,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<models::OrganizationRoleWithAssoc, diesel::result::Error> {
    let organization = organizations::organizations::find_by_id(
        role.organization_id, titan_db)?;

    let user_profile = match role.user_id {
        Some(user_id) => {
            let user = accounts::users::find_by_id(user_id, titan_db)?;
            Some(accounts::users::map_user_to_profile(
                user, wcf_db, app_config)?)
        }
        _ => None
    };

    Ok(models::OrganizationRoleWithAssoc {
        id: role.id,
        organization,
        user_profile,
        role: role.role,
        rank: role.rank
    })
}
