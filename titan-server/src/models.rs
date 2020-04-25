use chrono;
use serde::{Serialize, Deserialize};

use crate::schema::{
    event_types,
    organizations,
    organization_roles,
    organizations_users,
    reports,
    users,
    user_file_entries,
    user_file_entry_types,
    user_event_excuses,
    wcf1_user,
    wcf1_user_activity_event,
    wcf1_user_group,
    wcf1_user_to_group,
    wcf1_user_group_option,
    wcf1_user_group_option_value,
};

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "wcf1_user"]
#[primary_key(user_id)]
pub struct WcfUser {
    #[serde(rename(deserialize = "userId", serialize = "userId"))]
    pub user_id: i32,
    pub username: String,
    #[serde(skip)]
    pub email: String,
    #[serde(skip)]
    pub password: String,
    #[serde(skip)]
    pub access_token: String,
    #[serde(skip)]
    pub language_id: i32,
    #[serde(skip)]
    pub registration_date: i32,
    #[serde(skip)]
    pub style_id: i32,
    #[serde(skip)]
    pub banned: bool,
    #[serde(skip)]
    pub ban_reason: Option<String>,
    #[serde(skip)]
    pub ban_expires: i32,
    #[serde(skip)]
    pub activation_code: i32,
    #[serde(skip)]
    pub last_lost_password_request_time: i32,
    #[serde(skip)]
    pub lost_password_key: String,
    #[serde(skip)]
    pub last_username_change: i32,
    // pub newEmail: String,
    // pub oldUsername: String,
    // pub quitStarted: i32,
    // pub reactivationCode: i32,
    // pub registrationIpAddress: String,
    // pub avatarID: Option<i32>,
    // pub disableAvatar: bool,
    // pub disableAvatarReason: Option<String>,
    // pub disableAvatarExpires: i32,
    // pub enableGravatar: bool,
    // pub gravatarFileExtension: String,
    // pub signature: Option<String>,
    // pub signatureEnableBBCodes: bool,
    // pub signatureEnableHtml: bool,
    // pub signatureEnableSmilies: bool,
    // pub disableSignature: bool,
    // pub disableSignatureReason: Option<String>,
    // pub disableSignatureExpires: i32,
    #[serde(rename(deserialize = "lastActivityTime", serialize = "lastActivityTime"))]
    pub last_activity_time: i64,
    // pub profileHits: i32,
    // pub rankID: Option<i32>,
    #[serde(rename(deserialize = "userTitle", serialize = "userTitle"))]
    pub user_title: String,
    #[serde(skip)]
    pub user_online_group_id: Option<i32>,
    // pub activityPoints: i32,
    // pub notificationMailToken: String,
    // pub authData: String,
    // pub likesReceived: i32,
    // pub socialNetworkPrivacySettings: Option<String>,
    // pub wbbPosts: i32
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "wcf1_user_group"]
#[primary_key(group_id)]
pub struct WcfUserGroup {
    pub group_id: i32,
    pub group_name: String
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "wcf1_user_to_group"]
#[primary_key(group_id, user_id)]
pub struct WcfUserToGroup {
    pub group_id: i32,
    pub user_id: i32
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "wcf1_user_group_option"]
#[primary_key(option_id)]
pub struct WcfUserGroupOption {
    #[serde(rename(serialize = "optionId"))]
    pub option_id: i32,
    #[serde(rename(serialize = "optionName"))]
    pub option_name: String,
    #[serde(rename(serialize = "categoryName"))]
    pub category_name: String,
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "wcf1_user_group_option_value"]
#[primary_key(group_id, option_id)]
pub struct WcfUserGroupOptionValue {
    pub group_id: i32,
    pub option_id: i32,
    pub option_value: String,
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "wcf1_user_activity_event"]
#[primary_key(event_id)]
pub struct WcfUserActivityEvent {
    #[serde(rename(deserialize = "eventId", serialize = "eventId"))]
    pub event_id: i32,
    #[serde(rename(deserialize = "userId", serialize = "userId"))]
    pub user_id: i32,
    pub time: i32
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct WcfUserOptionValue {
    #[serde(rename(deserialize = "userId", serialize = "userId"))]
    pub user_id: i32,
    #[serde(rename(deserialize = "userAvatarId", serialize = "userAvatarId"))]
    pub user_avatar_id: i32
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct WcfUserAvatar {
    #[serde(rename(deserialize = "avatarId", serialize = "avatarId"))]
    pub avatar_id: i32,
    #[serde(rename(deserialize = "userId", serialize = "userId"))]
    pub user_id: i32,
    #[serde(rename(deserialize = "avatarName", serialize = "avatarName"))]
    pub avatar_name: String,
    #[serde(rename(deserialize = "fileHash", serialize = "fileHash"))]
    pub file_hash: String
}

impl WcfUserAvatar {
    /// Builds the avatar's URL.
    ///
    /// Format: "/{fileHash[0..2]}/{avatarID}-{fileHash}/{size: 32|96|128|256}.png"
    pub fn get_avatar_url(&self) -> String {
        return format!(
            "{}/{}-{}-128.png",
            &self.file_hash[0..2],
            &self.avatar_id.to_string(),
            &self.file_hash
        );
    }
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "organizations"]
pub struct Organization {
    pub id: i32,
    pub name: String,
    pub slug: String,
    #[serde(rename(deserialize = "avatarUrl", serialize = "avatarUrl"))]
    pub avatar_url: String,
    #[serde(rename(deserialize = "bannerImageUrl", serialize = "bannerImageUrl"))]
    pub banner_image_url: Option<String>,
    #[serde(rename(deserialize = "previewImageUrl", serialize = "previewImageUrl"))]
    pub preview_image_url: Option<String>,
    #[serde(rename(deserialize = "groupType", serialize = "groupType"))]
    pub group_type: String,
    #[serde(rename(deserialize = "wcfUserGroupId", serialize = "wcfUserGroupId"))]
    pub wcf_user_group_id: i32,
    #[serde(rename(deserialize = "isEnabled", serialize = "isEnabled"))]
    pub is_enabled: bool,
    #[serde(rename(deserialize = "parentId", serialize = "parentId"))]
    pub parent_id: Option<i32>,
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "organization_roles"]
pub struct OrganizationRole {
    pub id: i32,
    #[serde(rename(deserialize = "organizationId", serialize = "organizationId"))]
    pub organization_id: i32,
    #[serde(rename(deserialize = "userId", serialize = "userId"))]
    pub user_id: Option<i32>,
    pub role: String,
    pub rank: Option<i32>
}

#[derive(Deserialize, Insertable)]
#[table_name = "organization_roles"]
pub struct NewOrganizationRole {
    #[serde(rename(deserialize = "organizationId"))]
    pub organization_id: i32,
    #[serde(rename(deserialize = "userId"))]
    pub user_id: Option<i32>,
    pub role: String,
    pub rank: Option<i32>
}

#[derive(AsChangeset, Deserialize)]
#[table_name = "organization_roles"]
#[changeset_options(treat_none_as_null="true")]
pub struct UpdateOrganizationRole {
    #[serde(rename(deserialize = "userId"))]
    pub user_id: Option<i32>,
    pub role: String,
    pub rank: Option<i32>
}

#[derive(AsChangeset)]
#[table_name = "organization_roles"]
#[changeset_options(treat_none_as_null="true")]
pub struct OrganizationRoleRankChangeSet {
    pub rank: Option<i32>
}

#[derive(Serialize)]
pub struct OrganizationRoleWithAssoc {
    pub id: i32,
    pub organization: Organization,
    #[serde(rename(serialize = "userProfile"))]
    pub user_profile: Option<UserProfile>,
    pub role: String,
    pub rank: Option<i32>
}

#[derive(Serialize)]
pub struct ChainOfCommand {
    #[serde(rename(serialize = "localCoc"))]
    pub local_coc: Vec<OrganizationRoleWithAssoc>,
    #[serde(rename(serialize = "extendedCoc"))]
    pub extended_coc: Vec<OrganizationRoleWithAssoc>
}

#[derive(Serialize, Queryable, Insertable)]
#[table_name = "organizations_users"]
pub struct OrganizationUser {
    pub organization_id: i32,
    #[serde(rename(serialize = "userId"))]
    pub user_id: i32
}

#[derive(Serialize)]
pub struct UserOrganizationMembership {
    pub organization: Organization,
    pub role: Option<OrganizationRole>,
}

#[derive(Insertable, Serialize, Deserialize)]
#[table_name = "users"]
pub struct NewUser {
    #[serde(rename(deserialize = "wcfId", serialize = "wcfId"))]
    pub wcf_id: i32,
    #[serde(rename(deserialize = "legacyPlayerId", serialize = "legacyPlayerId"))]
    pub legacy_player_id: Option<i32>,
    #[serde(rename(deserialize = "rankId", serialize = "rankId"))]
    pub rank_id: Option<i32>,
    pub username: String,
    pub orientation: Option<i32>,
    #[serde(rename(deserialize = "bctE0", serialize = "bctE0"))]
    pub bct_e0: Option<i32>,
    #[serde(rename(deserialize = "bctE1", serialize = "bctE1"))]
    pub bct_e1: Option<i32>,
    #[serde(rename(deserialize = "bctE2", serialize = "bctE2"))]
    pub bct_e2: Option<i32>,
    #[serde(rename(deserialize = "bctE3", serialize = "bctE3"))]
    pub bct_e3: Option<i32>,
    pub loa: Option<i32>,
    pub a15: Option<i32>,
    #[serde(rename(deserialize = "dateJoined", serialize = "dateJoined"))]
    pub date_joined: Option<chrono::NaiveDateTime>,
    #[serde(rename(deserialize = "dateCreated", serialize = "dateCreated"))]
    pub date_created: chrono::NaiveDateTime,
    #[serde(rename(deserialize = "dateModified", serialize = "dateModified"))]
    pub date_modified: Option<chrono::NaiveDateTime>,
    #[serde(rename(deserialize = "modifiedBy", serialize = "modifiedBy"))]
    pub modified_by: Option<i32>,
    #[serde(rename(deserialize = "lastActivity", serialize = "lastActivity"))]
    pub last_activity: chrono::NaiveDateTime,
    #[serde(rename(deserialize = "isActive", serialize = "isActive"))]
    pub is_active: bool
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "users"]
pub struct User {
    pub id: i32,
    #[serde(rename(deserialize = "wcfId", serialize = "wcfId"))]
    pub wcf_id: i32,
    #[serde(rename(deserialize = "legacyPlayerId", serialize = "legacyPlayerId"))]
    pub legacy_player_id: Option<i32>,
    #[serde(rename(deserialize = "rankId", serialize = "rankId"))]
    pub rank_id: Option<i32>,
    pub username: String,
    pub orientation: Option<i32>,
    #[serde(rename(deserialize = "bctE0", serialize = "bctE0"))]
    pub bct_e0: Option<i32>,
    #[serde(rename(deserialize = "bctE1", serialize = "bctE1"))]
    pub bct_e1: Option<i32>,
    #[serde(rename(deserialize = "bctE2", serialize = "bctE2"))]
    pub bct_e2: Option<i32>,
    #[serde(rename(deserialize = "bctE3", serialize = "bctE3"))]
    pub bct_e3: Option<i32>,
    pub loa: Option<i32>,
    pub a15: Option<i32>,
    #[serde(rename(deserialize = "dateJoined", serialize = "dateJoined"))]
    pub date_joined: Option<chrono::NaiveDateTime>,
    #[serde(rename(deserialize = "dateCreated", serialize = "dateCreated"))]
    pub date_created: chrono::NaiveDateTime,
    #[serde(rename(deserialize = "dateModified", serialize = "dateModified"))]
    pub date_modified: Option<chrono::NaiveDateTime>,
    #[serde(rename(deserialize = "modifiedBy", serialize = "modifiedBy"))]
    pub modified_by: Option<i32>,
    #[serde(rename(deserialize = "lastActivity", serialize = "lastActivity"))]
    pub last_activity: Option<chrono::NaiveDateTime>,
    #[serde(rename(deserialize = "isActive", serialize = "isActive"))]
    pub is_active: bool
}

#[derive(Serialize, Deserialize)]
pub struct UserProfile {
    pub id: i32,
    #[serde(rename(deserialize = "wcfId", serialize = "wcfId"))]
    pub wcf_id: i32,
    #[serde(rename(deserialize = "legacyPlayerId", serialize = "legacyPlayerId"))]
    pub legacy_player_id: Option<i32>,
    #[serde(rename(deserialize = "rankId", serialize = "rankId"))]
    pub rank_id: Option<i32>,
    pub username: String,
    pub orientation: Option<i32>,
    #[serde(rename(deserialize = "bctE0", serialize = "bctE0"))]
    pub bct_e0: Option<i32>,
    #[serde(rename(deserialize = "bctE1", serialize = "bctE1"))]
    pub bct_e1: Option<i32>,
    #[serde(rename(deserialize = "bctE2", serialize = "bctE2"))]
    pub bct_e2: Option<i32>,
    #[serde(rename(deserialize = "bctE3", serialize = "bctE3"))]
    pub bct_e3: Option<i32>,
    pub loa: Option<i32>,
    pub a15: Option<i32>,
    #[serde(rename(deserialize = "dateJoined", serialize = "dateJoined"))]
    pub date_joined: Option<chrono::NaiveDateTime>,
    #[serde(rename(deserialize = "lastActivity", serialize = "lastActivity"))]
    pub last_activity: chrono::NaiveDateTime,
    pub wcf: WcfUserProfile
}

#[derive(Serialize, Deserialize)]
pub struct WcfUserProfile {
    #[serde(rename(deserialize = "avatarUrl", serialize = "avatarUrl"))]
    pub avatar_url: Option<String>,
    #[serde(rename(deserialize = "lastActivityTime", serialize = "lastActivtyTime"))]
    pub last_activity_time: i64,
    #[serde(rename(deserialize = "userTitle", serialize = "userTitle"))]
    pub user_title: String,
    pub username: String,
}

#[derive(Serialize, Deserialize)]
pub struct NewUserFileEntryType {
    pub name: String
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "user_file_entry_types"]
#[primary_key(id)]
pub struct UserFileEntryType {
    pub id: i32,
    pub name: String
}

#[derive(Insertable, Serialize, Deserialize)]
#[table_name = "user_file_entries"]
pub struct NewUserFileEntry {
    #[serde(rename(deserialize = "userFileEntryTypeId", serialize = "userFileEntryTypeId"))]
    pub user_file_entry_type_id: i32,
    #[serde(rename(deserialize = "userId", serialize = "userId"))]
    pub user_id: i32,
    #[serde(rename(deserialize = "startDate", serialize = "startDate"))]
    pub start_date: chrono::NaiveDateTime,
    #[serde(rename(deserialize = "endDate", serialize = "endDate"))]
    pub end_date: Option<chrono::NaiveDateTime>,
    pub comments: Option<String>,
    #[serde(rename(deserialize = "dateModified", serialize = "dateModified"))]
    pub date_modified: chrono::NaiveDateTime,
    #[serde(rename(deserialize = "modifiedBy", serialize = "modifiedBy"))]
    pub modified_by: i32
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "user_file_entries"]
pub struct UserFileEntry {
    pub id: i32,
    #[serde(rename(deserialize = "userFileEntryTypeId", serialize = "userFileEntryTypeId"))]
    pub user_file_entry_type_id: i32,
    #[serde(rename(deserialize = "userId", serialize = "userId"))]
    pub user_id: i32,
    #[serde(rename(deserialize = "startDate", serialize = "startDate"))]
    pub start_date: chrono::NaiveDateTime,
    #[serde(rename(deserialize = "endDate", serialize = "endDate"))]
    pub end_date: Option<chrono::NaiveDateTime>,
    pub comments: Option<String>,
    #[serde(rename(deserialize = "dateModified", serialize = "dateModified"))]
    pub date_modified: chrono::NaiveDateTime,
    #[serde(rename(deserialize = "modifiedBy", serialize = "modifiedBy"))]
    pub modified_by: i32
}

#[derive(Serialize, Deserialize)]
pub struct UserFileEntryWithAssoc {
    pub id: i32,
    #[serde(rename(deserialize = "fileEntryType", serialize = "fileEntryType"))]
    pub file_entry_type: UserFileEntryType,
    #[serde(rename(deserialize = "userProfile", serialize = "userProfile"))]
    pub user_profile: UserProfile,
    #[serde(rename(deserialize = "startDate", serialize = "startDate"))]
    pub start_date: chrono::NaiveDateTime,
    #[serde(rename(deserialize = "endDate", serialize = "endDate"))]
    pub end_date: Option<chrono::NaiveDateTime>,
    pub comments: Option<String>,
    #[serde(rename(deserialize = "dateModified", serialize = "dateModified"))]
    pub date_modified: chrono::NaiveDateTime,
    #[serde(rename(deserialize = "modifiedBy", serialize = "modifiedBy"))]
    pub modified_by: UserProfile
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
pub struct EventType {
    pub id: i32,
    pub name: String
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
pub struct UserEventExcuse {
    pub id: i32,
    pub user_id: i32,
    pub event_type_id: i32,
    pub event_date: chrono::NaiveDateTime,
    pub comments: String,
    pub ack_user_id: Option<i32>,
    pub ack_date: Option<chrono::NaiveDateTime>,
    pub ack_comments: Option<String>,
    pub date_created: chrono::NaiveDateTime,
    pub date_modified: chrono::NaiveDateTime,
}

#[derive(Insertable)]
#[table_name = "user_event_excuses"]
pub struct NewUserEventExcuse {
    pub user_id: i32,
    pub event_type_id: i32,
    pub event_date: chrono::NaiveDateTime,
    pub comments: String,
    pub ack_user_id: Option<i32>,
    pub ack_date: Option<chrono::NaiveDateTime>,
    pub ack_comments: Option<String>,
    pub date_created: chrono::NaiveDateTime,
    pub date_modified: chrono::NaiveDateTime,
}

#[derive(Serialize)]
pub struct UserEventExcuseWithType {
    pub id: i32,
    pub user_id: i32,
    pub event_type: EventType,
    pub event_date: chrono::NaiveDateTime,
    pub comments: String,
    pub ack_user_id: Option<i32>,
    pub ack_date: Option<chrono::NaiveDateTime>,
    pub ack_comments: Option<String>,
    pub date_created: chrono::NaiveDateTime,
    pub date_modified: chrono::NaiveDateTime,
}

#[derive(Serialize)]
pub struct UserEventExcuseWithAssoc {
    pub id: i32,
    pub user: UserProfile,
    pub event_type: EventType,
    pub event_date: chrono::NaiveDateTime,
    pub comments: String,
    pub ack_user: Option<UserProfile>,
    pub ack_date: Option<chrono::NaiveDateTime>,
    pub ack_comments: Option<String>,
    pub date_created: chrono::NaiveDateTime,
    pub date_modified: chrono::NaiveDateTime,
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
pub struct Report {
    pub id: i32,
    pub role_id: i32,
    pub term_start_date: chrono::NaiveDateTime,
    pub submission_date: Option<chrono::NaiveDateTime>,
    pub comments: Option<String>,
    pub ack_user_id: Option<i32>,
    pub ack_date: Option<chrono::NaiveDateTime>,
    pub date_created: chrono::NaiveDateTime,
    pub date_modified: chrono::NaiveDateTime,
}

#[derive(Deserialize, Insertable)]
#[table_name = "reports"]
pub struct NewReport {
    pub role_id: i32,
    pub term_start_date: chrono::NaiveDateTime,
    pub submission_date: Option<chrono::NaiveDateTime>,
    pub comments: Option<String>,
    pub ack_user_id: Option<i32>,
    pub ack_date: Option<chrono::NaiveDateTime>,
    pub date_created: chrono::NaiveDateTime,
    pub date_modified: chrono::NaiveDateTime,
}

#[derive(Serialize)]
pub struct ReportWithAssoc {
    pub id: i32,
    pub role: OrganizationRoleWithAssoc,
    pub term_start_date: chrono::NaiveDateTime,
    pub submission_date: Option<chrono::NaiveDateTime>,
    pub comments: Option<String>,
    pub ack_user: Option<UserProfile>,
    pub ack_date: Option<chrono::NaiveDateTime>,
    pub date_created: chrono::NaiveDateTime,
    pub date_modified: chrono::NaiveDateTime,
}
