use crate::accounts::acl;
use frank_jwt::{Algorithm, encode};
use rocket::request::Form;
use rocket::{get, post, State, response::status};
use rocket_contrib::json::Json;
use serde::{Deserialize, Serialize};

use crate::accounts::users;
use crate::accounts::file_entries;
use crate::accounts::file_entry_types;
use crate::accounts::excuses;
use crate::teams;
use crate::config;
use crate::db::{UnksoMainForums, TitanPrimary};
use crate::woltlab_auth_helper;
use crate::models;
use crate::guards::auth_guard;

/** **************************************************
 *  Auth
 ** **************************************************/
#[derive(Deserialize)]
pub struct WoltlabLoginRequest {
    pub user_id: i32,
    pub cookie_password: String,
}

#[derive(Serialize)]
pub struct WoltlabLoginResponse {
    pub token: String,
    pub user: models::UserProfile,
    pub wcf_username: String,
    pub wcf_user_title: String,
    pub acl: Vec<models::WcfUserGroupOption>,
    pub roles: Vec<models::OrganizationRole>,
}

#[post("/woltlab", format = "application/json", data = "<login_creds>")]
pub fn woltlab_login(
    unkso_main: UnksoMainForums,
    titan_primary: TitanPrimary,
    login_creds: Json<WoltlabLoginRequest>,
    app_config: State<config::AppConfig>,
) -> Result<Json<WoltlabLoginResponse>, status::NotFound<String>> {
    let wcf_db = &*unkso_main;
    let titan_db = &*titan_primary;

    // @Todo Handle error state
    let wcf_user: models::WcfUser = users::wcf_find_by_user_id(
        login_creds.user_id,
        wcf_db,
    ).unwrap();

    let is_valid = woltlab_auth_helper::check_password(
        &wcf_user.password,
        &login_creds.cookie_password,
    );

    if !is_valid {
        return Err(status::NotFound("Invalid credentials".to_string()));
    }

    let user_res = users::create_if_not_exists(&wcf_user, &*titan_db);

    if user_res.is_err() {
        return Err(status::NotFound("".to_string()));
    }

    let user = user_res.unwrap();

    let header = json!({});
    let payload = json!({
        "user": {
            "id": user.id,
            "wcf_id": user.wcf_id
        }
    });

    let token = encode(
        header.into(),
        &app_config.secret_key,
        &payload,
        Algorithm::HS256,
    );

    let avatar_res = users::wcf_find_user_avatar(wcf_user.user_id, wcf_db);
    let mut avatar_url = "".to_string();
    if let Ok(avatar_res) = avatar_res {
        avatar_url = format!("{}/{}", app_config.avatar_base_url, avatar_res.get_avatar_url());
    }

    Ok(Json(WoltlabLoginResponse {
        token: token.unwrap(),
        user: models::UserProfile {
            id: user.id,
            wcf_id: user.wcf_id,
            legacy_player_id: user.legacy_player_id,
            rank_id: user.rank_id,
            username: user.username,
            orientation: user.orientation,
            bct_e0: user.bct_e0,
            bct_e1: user.bct_e1,
            bct_e2: user.bct_e2,
            bct_e3: user.bct_e3,
            loa: user.loa,
            a15: user.a15,
            date_joined: user.date_joined,
            last_activity: user.last_activity.unwrap_or_else(|| chrono::Utc::now().naive_utc()),
            wcf: models::WcfUserProfile {
                user_title: wcf_user.user_title.clone(),
                username: wcf_user.username.clone(),
                last_activity_time: wcf_user.last_activity_time,
                avatar_url: Some(avatar_url),
            },
        },
        wcf_username: wcf_user.username,
        wcf_user_title: wcf_user.user_title,
        acl: acl::get_user_acl(
            wcf_user.user_id, wcf_db).unwrap_or_else(|_| vec![]),
        roles: teams::roles::find_ranked_by_user_id(
            user.id, titan_db).unwrap_or_else(|_| vec![])
    }))
}

/** **************************************************
 *  Users
 ** **************************************************/

#[derive(FromForm)]
pub struct ListUsersRequest {
    /// The username to filter by. Only users with this value as a
    /// prefix will be included in the result set.
    username: Option<String>,
    /// The maximum number of users to return.
    limit: Option<u16>,
}

#[get("/?<fields..>")]
pub fn list_users(
    fields: Form<ListUsersRequest>,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>
) -> Json<Vec<models::UserProfile>> {
    let users_res = users::search(
        fields.username.clone(), fields.limit, &*titan_db).unwrap();

    match users_res {
        Some(users) => Json(users::map_users_to_profile(
            &users, &*wcf_db, &app_config).unwrap()),
        None => Json(vec![])
    }
}

#[get("/<user_id>")]
pub fn get_user(
    user_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    _auth_guard: auth_guard::AuthenticatedUser,
) -> Result<Json<models::UserProfile>, status::NotFound<String>> {
    let user_res = users::find_by_id(user_id, &*titan_db);
    match user_res {
        Ok(user) => Ok(Json(users::map_user_to_profile(&user, &*wcf_db, &app_config).unwrap())),
        _ => Err(status::NotFound("WCF user not found".to_string()))
    }
}

/** ******************************************************************
 *  File entries
 ** *****************************************************************/
#[get("/file-entry-types")]
pub fn list_user_file_entry_types(
    titan_db: TitanPrimary
) -> Result<Json<Vec<models::UserFileEntryType>>, status::BadRequest<String>> {
    let file_entries_res = file_entry_types::find_file_entry_types(&*titan_db);

    if file_entries_res.is_err() {
        return Err(status::BadRequest(Some("Failed to load file entries.".to_string())));
    }

    Ok(Json(file_entries_res.unwrap()))
}

#[derive(Serialize)]
pub struct ListUserFileEntriesResponse {
    pub items: Vec<models::UserFileEntryWithAssoc>
}

#[get("/<user_id>/file-entries")]
pub fn list_user_file_entries(
    user_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    auth_user: auth_guard::AuthenticatedUser,
) -> Result<Json<ListUserFileEntriesResponse>, status::NotFound<String>> {
    let file_entries_res = file_entries::find_by_user(
        user_id, &*titan_db, &*wcf_db, &app_config);

    if let Ok(mut file_entries) = file_entries_res {
        for entry in file_entries.iter_mut() {
            if entry.file_entry_type.name == "LOA" && (auth_user.user.id != user_id &&
                !acl::has_acl_option(auth_user.user.wcf_id, "canViewLoa", &*wcf_db)) {
                entry.comments = Some("The details of this entry have been omitted as they may \
                    contain private information. You do not have permission to access this \
                    information.".to_string());
            }
        }

        return Ok(Json(ListUserFileEntriesResponse {
            items: file_entries
        }));
    }

    Err(status::NotFound("".to_string()))
}

#[derive(Deserialize)]
pub struct CreateUserFileEntry {
    file_entry_type_id: i32,
    start_date: chrono::NaiveDateTime,
    end_date: chrono::NaiveDateTime,
    comments: String,
}

#[derive(Serialize)]
pub struct CreateUserFileEntryResponse {
    file_entry: models::UserFileEntryWithAssoc
}

#[post("/<user_id>/file-entries", format = "application/json", data = "<file_entry_form>")]
pub fn save_user_file_entry(
    user_id: i32,
    file_entry_form: Json<CreateUserFileEntry>,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    auth_user: auth_guard::AuthenticatedUser,
) -> Result<Json<CreateUserFileEntryResponse>, status::BadRequest<String>> {
    let new_file_entry = models::NewUserFileEntry {
        user_id,
        user_file_entry_type_id: file_entry_form.file_entry_type_id,
        start_date: file_entry_form.start_date,
        end_date: Some(file_entry_form.end_date),
        comments: Some(file_entry_form.comments.to_string()),
        modified_by: auth_user.user.id,
        date_modified: chrono::Utc::now().naive_utc(),
    };

    let created_file_entry_res = file_entries::create_file_entry(
        &new_file_entry, &*titan_db, &*wcf_db, &app_config);

    if created_file_entry_res.is_err() {
        return Err(status::BadRequest(Some("Failed to save file entry.".to_string())));
    }

    Ok(Json(CreateUserFileEntryResponse {
        file_entry: created_file_entry_res.unwrap()
    }))
}

/** **************************************************
 *  Excuses
 ** **************************************************/
#[get("/excuses/unacknowledged")]
pub fn list_unacknowledged_excuses(
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    _auth_user: auth_guard::AuthenticatedUser
) -> Json<Vec<models::UserEventExcuseWithAssoc>> {
    Json(excuses::find_all_unacknowledged(
        &*titan_db, &*wcf_db, &app_config).unwrap())
}
#[get("/<user_id>/excuses")]
pub fn list_user_event_excuses(
    user_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    _auth_user: auth_guard::AuthenticatedUser
) -> Json<Vec<models::UserEventExcuseWithAssoc>> {
    Json(excuses::get_user_excuses(
        user_id, &*titan_db, &*wcf_db, &app_config).unwrap())
}

#[derive(Deserialize)]
pub struct CreateUserEventExcuseRequest {
    pub event_date: chrono::NaiveDateTime,
    pub event_type_id: i32,
    pub comments: String,
}

#[post("/<user_id>/excuses", format = "application/json", data = "<excuse_form>")]
pub fn save_user_event_excuse(
    user_id: i32,
    excuse_form: Json<CreateUserEventExcuseRequest>,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    _auth_user: auth_guard::AuthenticatedUser
) -> Result<Json<models::UserEventExcuseWithAssoc>, status::BadRequest<String>> {
    let new_excuse = models::NewUserEventExcuse {
        user_id,
        event_type_id: excuse_form.event_type_id,
        event_date: excuse_form.event_date,
        comments: excuse_form.comments.clone(),
        ack_user_id: None,
        ack_date: None,
        ack_comments: None,
        date_modified: chrono::Utc::now().naive_utc(),
        date_created: chrono::Utc::now().naive_utc()
    };

    let created_excuse = excuses::create_event_excuse(
        &new_excuse, &*titan_db, &*wcf_db, &app_config);

    if created_excuse.is_err() {
        return Err(status::BadRequest(Some("Failed to save event excuse.".to_string())));
    }

    Ok(Json(created_excuse.unwrap()))
}

#[post("/excuses/<excuse_id>/ack", rank = 1)]
pub fn ack_user_event_excuse(
    excuse_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    auth_user: auth_guard::AuthenticatedUser
) -> Json<models::UserEventExcuseWithAssoc> {
    Json(excuses::ack_event_excuse(
        excuse_id, &auth_user.user, &*titan_db, &*wcf_db, &app_config).unwrap())
}

/** **************************************************
 *  Organizations
 ** **************************************************/
#[get("/<id>/organizations?<member>&<role>")]
pub fn get_user_organizations(
    id: i32,
    member: Option<bool>,
    role: Option<bool>,
    titan_db: TitanPrimary,
    _auth_user: auth_guard::AuthenticatedUser
) -> Json<Vec<models::UserOrganizationMembership>> {
    let titan_db_ref = &*titan_db;
    let include_members = member.is_some() && member.unwrap();
    let include_roles = role.is_some() && role.unwrap();
    let mut org_memberships: Vec<models::UserOrganizationMembership> = vec!();

    if include_members {
        let mut member_orgs =
            teams::organizations::find_all_by_user(id, titan_db_ref).unwrap();
        org_memberships.append(&mut member_orgs);
    }

    if include_roles {
        let mut role_orgs = teams::roles::find_all_by_user(id, titan_db_ref).unwrap();
        org_memberships.append(&mut role_orgs);
    }

    Json(org_memberships)
}
