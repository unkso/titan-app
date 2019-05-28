use diesel::prelude::*;
use rocket::State;
use crate::models;
use crate::schema;
use crate::accounts;
use crate::organizations;
use crate::config;

/// Queries all the reports for an organization.
pub fn find_all_by_organization(
    org_id: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> QueryResult<Vec<models::ReportWithAssoc>> {
    let reports = schema::reports::table
        .select(schema::reports::all_columns)
        .inner_join(schema::organization_roles::table)
        .filter(schema::organization_roles::organization_id.eq(org_id))
        .order_by(schema::reports::submission_date.desc())
        .get_results::<models::Report>(titan_db)?;

    map_reports_to_assoc(reports, titan_db, wcf_db, app_config)
}

/// Queries an organization's reports submitted by a role with the
/// given rank, including all reports submitted by lower ranking
/// leaders.
pub fn find_all_by_org_up_to_rank(
    org_id: i32,
    rank: i32,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> QueryResult<Vec<models::ReportWithAssoc>> {
    let reports = schema::reports::table
        .select(schema::reports::all_columns)
        .inner_join(schema::organization_roles::table)
        .filter(schema::organization_roles::organization_id.eq(org_id))
        .filter(schema::organization_roles::rank.ge(rank))
        .order_by(schema::reports::submission_date.desc())
        .get_results::<models::Report>(titan_db)?;

    map_reports_to_assoc(reports, titan_db, wcf_db, app_config)
}

pub fn save_report(
    new_report: &models::NewReport,
    role: models::OrganizationRole,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<models::ReportWithAssoc, diesel::result::Error> {
    diesel::insert_into(schema::reports::table)
        .values(new_report)
        .execute(titan_db)?;

    let last_inserted = schema::reports::table
        .order_by(schema::reports::id.desc())
        .first(titan_db)?;

    map_report_to_assoc(last_inserted, titan_db, wcf_db, app_config)
}

pub fn map_reports_to_assoc(
    reports: Vec<models::Report>,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<Vec<models::ReportWithAssoc>, diesel::result::Error> {
    Ok(reports.into_iter().map(|report| {
        map_report_to_assoc(report, titan_db, wcf_db, app_config).unwrap()
    }).collect())
}

pub fn map_report_to_assoc(
    report: models::Report,
    titan_db: &MysqlConnection,
    wcf_db: &MysqlConnection,
    app_config: &State<config::AppConfig>
) -> Result<models::ReportWithAssoc, diesel::result::Error> {
    let role = organizations::roles::find_by_id(
        report.role_id, titan_db)?;

    let ack_user_profile = match report.ack_user_id {
        Some(id) => {
            let ack_user = accounts::users::find_by_id(
                id, titan_db)?;
            Some(accounts::users::map_user_to_profile(ack_user, wcf_db, app_config)?)
        },
        None => None
    };

    return Ok(models::ReportWithAssoc {
        id: report.id,
        role: organizations::roles::map_role_assoc(
            role, titan_db, wcf_db, app_config)?,
        term_start_date: report.term_start_date,
        submission_date: report.submission_date,
        comments: report.comments,
        ack_user: ack_user_profile,
        ack_date: report.ack_date,
        date_created: report.date_created,
        date_modified: report.date_modified
    })
}
