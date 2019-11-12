use crate::accounts::acl;
use frank_jwt::{Algorithm, encode, Error as JwtError};
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
use crate::api::{ApiResponse, ApiError};
use crate::config::AppConfig;

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
) -> ApiResponse<WoltlabLoginResponse> {
    let wcf_db = &*unkso_main;
    let titan_db = &*titan_primary;
    let res = users::wcf_find_by_user_id(login_creds.user_id, wcf_db)
        .map_err(ApiError::from)
        .and_then(|wcf_user| {
            let is_valid = woltlab_auth_helper::check_password(
                &wcf_user.password, &login_creds.cookie_password);
            if is_valid {
                Ok(wcf_user)
            } else {
                Err(ApiError::AuthenticationError)
            }
        })
        .and_then(|wcf_user|
            users::create_if_not_exists(&wcf_user, &*titan_db)
                .and_then(|user| users::map_user_to_profile(&user, wcf_db, &app_config))
                .map_err(ApiError::from)
                .map(|profile| (wcf_user, profile)))
        .and_then(|(wcf_user, profile)| {
            create_jwt(&profile, &app_config)
                .map(|token| {
                    let user_id = profile.id;
                    WoltlabLoginResponse {
                        token,
                        user: profile,
                        wcf_username: wcf_user.username,
                        wcf_user_title: wcf_user.user_title,
                        acl: acl::get_user_acl(
                            wcf_user.user_id, wcf_db).unwrap_or_else(|_| vec![]),
                        roles: teams::roles::find_ranked_by_user_id(
                            user_id, titan_db).unwrap_or_else(|_| vec![])
                    }
                })
                .map_err(|_| ApiError::AuthenticationError)
        });

    ApiResponse::from(res)
}

fn create_jwt(user: &models::UserProfile, app_config: &AppConfig) -> Result<String, JwtError> {
    let header = json!({});
    let payload = json!({
        "user": {
            "id": user.id,
            "wcf_id": user.wcf_id
        }
    });
    encode(
        header.into(),
        &app_config.secret_key,
        &payload,
        Algorithm::HS256,
    )
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
) -> ApiResponse<Vec<models::UserProfile>> {
    let users_res: Result<Vec<models::UserProfile>, ApiError> = users::search(
        fields.username.clone(), fields.limit, &*titan_db)
        .and_then(|res| {
            match res {
                Some(users) => users::map_users_to_profile(
                    &users, &*wcf_db, &app_config),
                None => Ok(vec![]),
            }
        })
        .map_err(ApiError::from);
    match users_res {
        Ok(res) => ApiResponse::from(res),
        Err(err) => ApiResponse::from(Err(err)),
    }
}

#[get("/<user_id>")]
pub fn get_user(
    user_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    _auth_guard: auth_guard::AuthenticatedUser,
) -> ApiResponse<models::UserProfile> {
    ApiResponse::from(users::find_by_id(user_id, &*titan_db)
        .and_then(|user| users::map_user_to_profile(&user, &*wcf_db, &app_config)))
}

/** ******************************************************************
 *  File entries
 ** *****************************************************************/
#[get("/file-entry-types")]
pub fn list_user_file_entry_types(
    titan_db: TitanPrimary
) -> ApiResponse<Vec<models::UserFileEntryType>> {
    ApiResponse::from(file_entry_types::find_file_entry_types(&*titan_db))
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
) -> ApiResponse<CreateUserFileEntryResponse> {
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

    match created_file_entry_res {
        Ok(file_entry) => ApiResponse::from(CreateUserFileEntryResponse {
            file_entry
        }),
        Err(err) => ApiResponse::from(Err(err))
    }
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
) -> ApiResponse<Vec<models::UserEventExcuseWithAssoc>> {
    ApiResponse::from(excuses::find_all_unacknowledged(
        &*titan_db, &*wcf_db, &app_config))
}
#[get("/<user_id>/excuses")]
pub fn list_user_event_excuses(
    user_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    _auth_user: auth_guard::AuthenticatedUser
) -> ApiResponse<Vec<models::UserEventExcuseWithAssoc>> {
    ApiResponse::from(excuses::get_user_excuses(
        user_id, &*titan_db, &*wcf_db, &app_config))
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
) -> ApiResponse<models::UserEventExcuseWithAssoc> {
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
    match created_excuse {
        Ok(excuse) => ApiResponse::from(excuse),
        Err(err) => ApiResponse::from(Err(err))
    }
}

#[post("/excuses/<excuse_id>/ack", rank = 1)]
pub fn ack_user_event_excuse(
    excuse_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    auth_user: auth_guard::AuthenticatedUser
) -> ApiResponse<models::UserEventExcuseWithAssoc> {
    ApiResponse::from(excuses::ack_event_excuse(
        excuse_id, &auth_user.user, &*titan_db, &*wcf_db, &app_config))
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
) -> ApiResponse<Vec<models::UserOrganizationMembership>> {
    let titan_db_ref = &*titan_db;
    let include_members = member.is_some() && member.unwrap();
    let include_roles = role.is_some() && role.unwrap();
    let mut org_memberships: Vec<models::UserOrganizationMembership> = vec!();

    if include_members {
        let member_orgs =
            teams::organizations::find_all_by_user(id, titan_db_ref);

        match member_orgs {
            Ok(mut orgs) => {
                org_memberships.append(&mut orgs)
            },
            Err(err) => {
                return ApiResponse::from(Err(err))
            }
        }
    }

    if include_roles {
        let role_orgs = teams::roles::find_all_by_user(id, titan_db_ref);
        match role_orgs {
            Ok(mut orgs) => {
                org_memberships.append(&mut orgs)
            },
            Err(err) => {
                return ApiResponse::from(Err(err))
            }
        }
    }

    ApiResponse::from(org_memberships)
}
