use std::collections::VecDeque;
use std::convert::TryFrom;
use diesel::prelude::*;
use rocket::State;
use rocket::http::RawStr;
use rocket::request::FromFormValue;
use crate::models;
use crate::schema;
use crate::accounts;
use crate::organizations;
use crate::config;
use crate::db;

/// Indicates the relation of a role or set of roles to an
/// organization's chain of command.
pub enum RoleRankScope {
    /// Set includes only roles that are in the chain of command for
    /// one or more members.
    ChainOfCommand = 0,
    /// Set includes only supporting roles, which are not in the chain
    /// of command for other members.
    Support = 1,
    /// Includes all roles, regardless of their relation to an
    /// organization's leadership structure.
    All = 2,
}

impl<'v> FromFormValue<'v> for RoleRankScope {
    type Error = &'v RawStr;

    fn from_form_value(form_value: &'v RawStr) -> Result<RoleRankScope, &'v RawStr> {
        match form_value.parse() {
            Ok(value) => {
                match value {
                    0 => Ok(RoleRankScope::ChainOfCommand),
                    1 => Ok(RoleRankScope::Support),
                    _ => Ok(RoleRankScope::All),
                }
            },
            _ => Err(form_value)
        }
    }
}

/// Finds an organization role by ID.
pub fn find_by_id(
    role_id: i32,
    titan_db: &MysqlConnection
) -> QueryResult<models::OrganizationRole> {
    schema::organization_roles::table
        .find(role_id)
        .first(titan_db)
}

/// Queries the last inserted organization role.
pub fn find_last_inserted(
    titan_db: &MysqlConnection
) -> QueryResult<models::OrganizationRole> {
    schema::organization_roles::table
        .order_by(schema::organization_roles::id.desc())
        .first(titan_db)
}

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

/// Finds the next user with ranking authority over the given rank.
///
/// Only roles within the organization will be queried. Parent
/// organizations will not be checked for higher ranking users.
pub fn find_next_local_org_coc(
    org_id: i32,
    rank: i32,
    include_unfilled_role: bool,
    titan_db: &MysqlConnection
) -> QueryResult<Option<models::OrganizationRole>> {
    let mut query = schema::organization_roles::table
        .filter(schema::organization_roles::organization_id.eq(org_id))
        .filter(schema::organization_roles::rank.lt(rank))
        .filter(schema::organization_roles::rank.is_not_null())
        .into_boxed();

    if !include_unfilled_role {
        query = query.filter(schema::organization_roles::user_id.is_not_null());
    }

    query
        .order_by(schema::organization_roles::rank.desc())
        .first::<models::OrganizationRole>(titan_db)
        .optional()
}

/// Finds the next role that reports directly to the current role.
pub fn find_direct_reports(
    org_id: i32,
    starting_rank: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> QueryResult<Vec<models::OrganizationRoleWithAssoc>> {
    let mut rank = starting_rank;
    let mut roles: Vec<models::OrganizationRoleWithAssoc> = vec!();
    let mut orgs_to_visit: VecDeque<i32> = VecDeque::new();
    orgs_to_visit.push_back(org_id);

    while !orgs_to_visit.is_empty() {
        let curr_org_id = orgs_to_visit.pop_front().unwrap();
        let role = find_local_direct_report(curr_org_id, rank, titan_db, wcf_db, app_config);

        match role {
            Ok(role) => {
                roles.push(role);
            },
            _ => {
                rank = -1;
                let mut child_org_ids = organizations::organizations::find_children_ids(curr_org_id, false, titan_db);
                for child_id in child_org_ids.drain(..) {
                    orgs_to_visit.push_back(child_id);
                }
            }
        }
    }

    Ok(roles)
}

pub fn find_local_direct_report(
    org_id: i32,
    rank: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> QueryResult<models::OrganizationRoleWithAssoc> {
    let role = schema::organization_roles::table
        .filter(schema::organization_roles::organization_id.eq(org_id))
        .filter(schema::organization_roles::user_id.is_not_null())
        .filter(schema::organization_roles::rank.gt(rank))
        .filter(schema::organization_roles::rank.is_not_null())
        .first::<models::OrganizationRole>(titan_db)?;

    map_role_assoc(&role, titan_db, wcf_db, app_config)
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

pub fn find_ranked_by_user_id(
    user_id: i32,
    titan_db: &MysqlConnection
) -> QueryResult<Vec<models::OrganizationRole>> {
    schema::organization_roles::table
        .filter(schema::organization_roles::user_id.eq(user_id))
        .get_results(titan_db)
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
    let rank: i32;

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
) -> Result<models::ChainOfCommand, diesel::result::Error> {
    let mut extended_coc: Vec<models::OrganizationRoleWithAssoc> = vec!();
    let mut local_coc: Vec<models::OrganizationRoleWithAssoc> = vec!();
    let mut curr_org_id = org_id;
    let mut curr_rank = starting_rank;
    loop {
        let parent_role = find_parent_role_by_org(
            curr_org_id, curr_rank, false, titan_db)?;
        match parent_role {
            Some(role) => {
                let role_assoc = map_role_assoc(
                    &role, titan_db, wcf_db, app_config)?;
                if role.organization_id.clone() == org_id {
                    local_coc.push(role_assoc);
                } else {
                    extended_coc.push(role_assoc);
                }

                curr_org_id = role.organization_id;
                // find_parent_role guarantees the role will have a rank.
                curr_rank = role.rank.unwrap();
            },
            _ => {
                break
            }
        }
    }

    Ok(models::ChainOfCommand {
        extended_coc,
        local_coc
    })
}

/// Finds the next user with ranking authority over the given rank.
///
/// If no ranking role is found within the role's organization, parent
/// organizations will be searched.
pub fn find_parent_role(
    role_id: i32,
    include_unfilled_role: bool,
    titan_db: &MysqlConnection,
) -> QueryResult<Option<models::OrganizationRole>> {
    let role = find_by_id(role_id, titan_db)?;

    // Unranked roles do not have a parent.
    if role.rank.is_none() {
        return Ok(None);
    }

    find_parent_role_by_org(role.organization_id, role.rank.unwrap(), include_unfilled_role, titan_db)
}

pub fn find_parent_role_by_org(
    org_id: i32,
    rank: i32,
    include_unfilled_role: bool,
    titan_db: &MysqlConnection,
) -> QueryResult<Option<models::OrganizationRole>> {
    let local_parent = find_next_local_org_coc(
        org_id, rank, include_unfilled_role, titan_db)?;

    if local_parent.is_some() {
        return Ok(local_parent)
    }

    let parent_org_res = organizations::organizations::find_parent(org_id, titan_db)?;
    match parent_org_res {
        Some(parent_org) => {
            match parent_org.parent_id {
                Some(parent_id) => find_parent_role_by_org(
                    parent_id, std::i32::MAX, include_unfilled_role, titan_db),
                _ => Ok(None)
            }
        },
        _ => Ok(None)
    }
}

pub fn find_org_roles(
    org_id: i32,
    rank_scope: RoleRankScope,
    titan_db: &MysqlConnection,
) -> QueryResult<Vec<models::OrganizationRole>> {
    let mut query = schema::organization_roles::table
        .filter(schema::organization_roles::organization_id.eq(org_id))
        .into_boxed();
    query = match rank_scope {
        RoleRankScope::ChainOfCommand => query.filter(
            schema::organization_roles::rank.is_not_null()),
        RoleRankScope::Support => query.filter(
            schema::organization_roles::rank.is_null()),
        _ => query
    };

    query.get_results::<models::OrganizationRole>(titan_db)
}

/// [deprecated(note = "Use find_org_roles instead.")]
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

/// Updates the `rank` for the given list of roles, where the role's
/// index in the list indicates it's position in the organization's
/// chain of command. For example, the role at index 0 holds the most
/// authority, the role at index 1 has the second most authority, and
/// so on.
///
/// All the given role IDs must belong to the same organization.
/// Otherwise, and error will occur.
pub fn reorder_roles(
    org_id: i32,
    role_ids: &Vec<i32>,
    titan_db: &MysqlConnection
) -> Result<(), db::TitanDatabaseError> {
    titan_db.transaction::<_, db::TitanDatabaseError, _>(|| {
        let changes = models::OrganizationRoleRankChangeSet {
            rank: None
        };
        let roles = schema::organization_roles::table
            .filter(schema::organization_roles::organization_id.eq(org_id))
            .filter(schema::organization_roles::id.eq_any(role_ids));
        let num_ranks_cleared = diesel::update(roles)
            .set(&changes)
            .execute(titan_db)
            .map_err(db::TitanDatabaseError::from)?;

        if num_ranks_cleared != role_ids.len() {
            return Err(db::TitanDatabaseError::UnexpectedResultCountError(format!(
                "Expected {} roles to be updated, but {} were updated instead.",
                role_ids.len(),
                num_ranks_cleared
            )))
        }

        for (i, role_id) in role_ids.iter().enumerate() {
            let role_query = schema::organization_roles::table
                .filter(schema::organization_roles::organization_id.eq(org_id))
                .find(role_id);
            diesel::update(role_query)
                .set(schema::organization_roles::rank.eq(i32::try_from(i).ok()))
                .execute(titan_db)
                .map_err(db::TitanDatabaseError::from)?;
        }

        Ok(())
    })
}

/// Returns true if the given user is assigned to a role in the COC
/// above the given organization.
pub fn is_user_in_parent_coc(
    user_id: i32,
    org_id: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> bool {
    let org_coc_res = find_org_coc(org_id, std::i32::MAX, titan_db, wcf_db, app_config);
    match org_coc_res {
        Ok(coc) => {
            coc.extended_coc.into_iter().any(|role| {
                match role.user_profile {
                    Some(profile) => profile.id == user_id,
                    _ => false
                }
            })
        },
        _ => false
    }
}

pub fn create(
    role: &models::NewOrganizationRole,
    titan_db: &MysqlConnection
) -> QueryResult<models::OrganizationRole> {
    let role = diesel::insert_into(schema::organization_roles::table)
        .values(role)
        .execute(titan_db);

    find_last_inserted(titan_db)
}

pub fn map_roles_assoc(
    roles: Vec<models::OrganizationRole>,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<Vec<models::OrganizationRoleWithAssoc>, diesel::result::Error> {
    roles.into_iter().map(|role| {
        map_role_assoc(&role, titan_db, wcf_db, app_config)
    }).collect()
}

pub fn map_role_assoc(
    role: &models::OrganizationRole,
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
                &user, wcf_db, app_config)?)
        }
        _ => None
    };

    Ok(models::OrganizationRoleWithAssoc {
        id: role.id,
        organization,
        user_profile,
        role: role.role.clone(),
        rank: role.rank
    })
}
