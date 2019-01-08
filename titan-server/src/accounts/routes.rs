use rocket::response::status;
use rocket::State;
use rocket_contrib::json::Json;
use frank_jwt::{Algorithm, encode};
use super::config;
use db::{UnksoMainForums, TitanPrimary};
use super::woltlab_auth_helper;
use models;
use auth_guard;
use super::users;
use super::file_entries;
use super::file_entry_types;
use accounts::acl;

/** **************************************************
 *  Auth
 ** **************************************************/
#[derive(Deserialize)]
pub struct WoltlabLoginRequest {
    pub user_id: i32,
    pub password_token: String
}

#[derive(Serialize)]
pub struct WoltlabLoginResponse {
    pub token: String,
    pub user: models::TitanUser,
    pub wcf_username: String,
    pub wcf_user_title: String,
    pub acl: Vec<models::WcfAclOption>
}

#[post("/woltlab", format = "application/json", data = "<login_creds>")]
pub fn woltlab_login(
    unkso_main: UnksoMainForums,
    titan_primary: TitanPrimary,
    login_creds: Json<WoltlabLoginRequest>,
    app_config: State<config::AppConfig>
) -> Result<Json<WoltlabLoginResponse>, status::NotFound<String>> {
    let wcf_db = &*unkso_main;

    // @Todo Handle error state
    let wcf_user: models::WcfUser = users::wcf_find_by_user_id(
        login_creds.user_id,
        wcf_db
    ).unwrap();

    let is_valid = woltlab_auth_helper::check_password(
        &wcf_user.password,
        &login_creds.password_token
    );

    if !is_valid {
        return Err(status::NotFound("Invalid credentials".to_string()));
    }

    let user_res = users::create_if_not_exists(&wcf_user, &*titan_primary);

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
        Algorithm::HS256
    );

    return Ok(Json(WoltlabLoginResponse {
        token: token.unwrap(),
        user,
        wcf_username: wcf_user.username,
        wcf_user_title: wcf_user.user_title,
        acl: match acl::get_user_acl(wcf_user.user_id, wcf_db) {
            Ok(options) => options,
            _ => vec!()
        }
    }));
}

/** **************************************************
 *  Users
 ** **************************************************/
#[get("/<user_id>")]
pub fn get_user(
    user_id: i32,
    titan_db: TitanPrimary,
    wcf_db: UnksoMainForums,
    app_config: State<config::AppConfig>,
    _auth_guard: auth_guard::AuthenticatedUser
) -> Result<Json<models::TitanUserProfile>, status::NotFound<String>> {
    let titan_db_conn = &*titan_db;
    let wcf_db_conn = &*wcf_db;

    let user_res = users::find_by_id(user_id, titan_db_conn);
    if user_res.is_err() {
        return Err(status::NotFound("User not found".to_string()));
    }

    let user = user_res.unwrap();
    let wcf_user_res = users::wcf_find_by_user_id(user.wcf_id, wcf_db_conn);
    if wcf_user_res.is_err() {
        return Err(status::NotFound("WCF user not found".to_string()))
    }

    let wcf_user = wcf_user_res.unwrap();
    let avatar_res = users::find_user_avatar(wcf_user.user_id, wcf_db_conn);
    let mut avatar_url = "".to_string();
    if avatar_res.is_err() {
        avatar_url = format!("{}/{}", app_config.avatar_base_url, avatar_res.unwrap().get_avatar_url())
    }

    Ok(Json(
        models::TitanUserProfile {
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
            last_activity: user.last_activity,
            wcf: models::WcfUserProfile {
                user_title: wcf_user.user_title,
                username: wcf_user.username,
                last_activity_time: wcf_user.last_activity_time,
                avatar_url: Some(avatar_url)
            }
        }
    ))
}

#[get("/file-entry-types")]
pub fn list_user_file_entry_types(
    titan_db: TitanPrimary
) -> Result<Json<Vec<models::UserFileEntryType>>, status::BadRequest<String>> {
    let file_entries_res= file_entry_types::find_file_entry_types(&*titan_db);

    if file_entries_res.is_err() {
        return Err(status::BadRequest(Some("Failed to load file entries.".to_string())));
    }

    Ok(Json(file_entries_res.unwrap()))
}

#[derive(Serialize)]
pub struct ListUserFileEntriesResponse {
    pub items: Vec<models::UserFileEntryWithType>
}

#[get("/<user_id>/file-entries")]
pub fn list_user_file_entries(
    user_id: i32,
    titan_primary: TitanPrimary,
    _auth_user: auth_guard::AuthenticatedUser
) -> Result<Json<ListUserFileEntriesResponse>, status::NotFound<String>> {
    let file_entries = file_entries::find_by_user(
        user_id,
        &*titan_primary
    );

    if file_entries.is_ok() {
        return Ok(Json(ListUserFileEntriesResponse {
            items: file_entries.unwrap()
        }));
    }

    Err(status::NotFound("".to_string()))
}

#[derive(Deserialize)]
pub struct CreateUserFileEntry {
    file_entry_type_id: i32,
    start_date: chrono::NaiveDateTime,
    end_date: chrono::NaiveDateTime,
    comments: String
}

#[derive(Serialize)]
pub struct CreateUserFileEntryResponse {
    file_entry: models::UserFileEntryWithType
}

#[post("/<user_id>/file-entries", format = "application/json", data = "<file_entry_form>")]
pub fn save_user_file_entry(
    user_id: i32,
    file_entry_form: Json<CreateUserFileEntry>,
    titan_db: TitanPrimary,
    auth_user: auth_guard::AuthenticatedUser
) -> Result<Json<CreateUserFileEntryResponse>, status::BadRequest<String>> {
    let new_file_entry = models::NewUserFileEntry {
        user_id,
        user_file_entry_type_id: file_entry_form.file_entry_type_id,
        start_date: file_entry_form.start_date,
        end_date: file_entry_form.end_date,
        comments: file_entry_form.comments.to_string(),
        modified_by: Some(auth_user.user.id),
        date_modified: Some(chrono::Utc::now().naive_utc())
    };

    let created_file_entry_res = file_entries::create_file_entry(&new_file_entry, &*titan_db);

    if created_file_entry_res.is_err() {
        return Err(status::BadRequest(Some("Failed to save file entry.".to_string())))
    }

    Ok(Json(CreateUserFileEntryResponse {
        file_entry: created_file_entry_res.unwrap()
    }))
}