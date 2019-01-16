use chrono;

// https://github.com/diesel-rs/diesel/issues/1785
#[allow(proc_macro_derive_resolution_fallback)]
use super::schema::{
    wcf1_user,
    wcf1_user_group,
    wcf1_user_to_group,
    wcf1_user_activity_event,
    organizations,
    users,
    wcf1_acl_option_category,
    wcf1_acl_option_to_group,
    wcf1_acl_option_to_user,
    user_file_entries,
    user_file_entry_types
};

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "wcf1_user"]
#[primary_key(user_id)]
pub struct WcfUser {
    pub user_id: i32,
    pub username: String,
    pub email: String,
    pub password: String,
    pub access_token: String,
    pub language_id: i32,
    pub registration_date: i32,
    pub style_id: i32,
    pub banned: bool,
    pub ban_reason: Option<String>,
    pub ban_expires: i32,
    pub activation_code: i32,
    pub last_lost_password_request_time: i32,
    pub lost_password_key: String,
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
    pub last_activity_time: i32,
    // pub profileHits: i32,
    // pub rankID: Option<i32>,
    pub user_title: String,
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
#[table_name = "wcf1_user_activity_event"]
#[primary_key(event_id)]
pub struct WcfUserActivityEvent {
    pub event_id: i32,
    pub user_id: i32,
    pub time: i32
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct WcfUserOptionValue {
    pub user_id: i32,
    pub user_avatar_id: i32
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct WcfUserAvatar {
    pub avatar_id: i32,
    pub user_id: i32,
    pub avatar_name: String,
    pub file_hash: String
}

impl WcfUserAvatar {
    /// Builds the avatar's URL.
    ///
    /// Format: "/{fileHash[0..2]}/{userID}-{fileHash}/{size: 32|96|128|256}.png"
    pub fn get_avatar_url(&self) -> String {
        return format!(
            "{}/{}-{}-128.png",
            &self.file_hash[0..2],
            &self.user_id.to_string(),
            &self.file_hash
        );
    }
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct WcfAclOptionCategory {
    id: i32,
    category_name: String
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct WcfAclOption {
    id: i32,
    option_name: String,
    category_name: String
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct WcfAclOptionToGroup {
    option_id: i32,
    group_id: i32,
    option_value: bool
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct WcfAclOptionToUser {
    option_id: i32,
    user_id: i32,
    option_value: bool
}

#[derive(Serialize, Queryable)]
pub struct UserAclEntry {
    group_id: i32,
    option_id: i32
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct WcfBranch {
    pub branch_id: i32,
    pub name: String,
    pub image: String,
    pub rank_unavailable_image: String,
    pub is_disabled: bool
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "organizations"]
pub struct TitanOrganization {
    pub id: i32,
    pub name: String,
    pub slug: String,
    pub group_type: String,
    pub parent_id: Option<i32>,
    pub wcf_user_group_id: i32,
    pub is_enabled: bool
}

#[derive(Insertable)]
#[table_name = "users"]
pub struct NewTitanUser {
    pub wcf_id: i32,
    pub legacy_player_id: Option<i32>,
    pub rank_id: Option<i32>,
    pub username: String,
    pub orientation: Option<i32>,
    pub bct_e0: Option<i32>,
    pub bct_e1: Option<i32>,
    pub bct_e2: Option<i32>,
    pub bct_e3: Option<i32>,
    pub loa: Option<i32>,
    pub a15: Option<i32>,
    pub date_joined: Option<chrono::NaiveDateTime>,
    pub date_created: chrono::NaiveDateTime,
    pub date_modified: Option<chrono::NaiveDateTime>,
    pub modified_by: Option<i32>,
    pub last_activity: chrono::NaiveDateTime,
    pub is_active: bool
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "users"]
pub struct TitanUser {
    pub id: i32,
    pub wcf_id: i32,
    pub legacy_player_id: Option<i32>,
    pub rank_id: Option<i32>,
    pub username: String,
    pub orientation: Option<i32>,
    pub bct_e0: Option<i32>,
    pub bct_e1: Option<i32>,
    pub bct_e2: Option<i32>,
    pub bct_e3: Option<i32>,
    pub loa: Option<i32>,
    pub a15: Option<i32>,
    pub date_joined: Option<chrono::NaiveDateTime>,
    pub date_created: chrono::NaiveDateTime,
    pub date_modified: Option<chrono::NaiveDateTime>,
    pub modified_by: Option<i32>,
    pub last_activity: chrono::NaiveDateTime,
    pub is_active: bool
}

#[derive(Serialize, Deserialize)]
pub struct TitanUserProfile {
    pub id: i32,
    pub wcf_id: i32,
    pub legacy_player_id: Option<i32>,
    pub rank_id: Option<i32>,
    pub username: String,
    pub orientation: Option<i32>,
    pub bct_e0: Option<i32>,
    pub bct_e1: Option<i32>,
    pub bct_e2: Option<i32>,
    pub bct_e3: Option<i32>,
    pub loa: Option<i32>,
    pub a15: Option<i32>,
    pub date_joined: Option<chrono::NaiveDateTime>,
    pub last_activity: chrono::NaiveDateTime,
    pub wcf: WcfUserProfile
}

#[derive(Serialize, Deserialize)]
pub struct WcfUserProfile {
    pub avatar_url: Option<String>,
    pub last_activity_time: i32,
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

#[derive(Insertable)]
#[table_name = "user_file_entries"]
pub struct NewUserFileEntry {
    pub user_file_entry_type_id: i32,
    pub user_id: i32,
    pub start_date: chrono::NaiveDateTime,
    pub end_date: chrono::NaiveDateTime,
    pub comments: String,
    pub date_modified: Option<chrono::NaiveDateTime>,
    pub modified_by: Option<i32>
}

#[derive(Identifiable, Serialize, Deserialize, Queryable)]
#[table_name = "user_file_entries"]
pub struct UserFileEntry {
    pub id: i32,
    pub user_file_entry_type_id: i32,
    pub user_id: i32,
    pub start_date: chrono::NaiveDateTime,
    pub end_date: chrono::NaiveDateTime,
    pub comments: String,
    pub date_modified: Option<chrono::NaiveDateTime>,
    pub modified_by: Option<i32>
}

#[derive(Serialize, Deserialize)]
pub struct UserFileEntryWithType {
    pub id: i32,
    pub file_entry_type: UserFileEntryType,
    pub user_id: i32,
    pub start_date: chrono::NaiveDateTime,
    pub end_date: chrono::NaiveDateTime,
    pub comments: String,
    pub date_modified: Option<chrono::NaiveDateTime>,
    pub modified_by: Option<i32>
}