table! {
    wcf1_user (userID) {
        userID -> Integer,
        username -> Varchar,
        email -> Varchar,
        password -> Varchar,
        accessToken -> Varchar,
        languageID -> Integer,
        registrationDate -> Integer,
        styleID -> Integer,
        banned -> Bool,
        banReason -> Nullable<Mediumtext>,
        banExpires -> Integer,
        activationCode -> Integer,
        lastLostPasswordRequestTime -> Integer,
        lostPasswordKey -> Varchar,
        lastUsernameChange -> Integer,
        // newEmail -> Varchar,
        // oldUsername -> Varchar,
        // quitStarted -> Integer,
        // reactivationCode -> Integer,
        // registrationIpAddress -> Varchar,
        // avatarID -> Nullable<Integer>,
        // disableAvatar -> Bool,
        // disableAvatarReason -> Nullable<Text>,
        // disableAvatarExpires -> Integer,
        // enableGravatar -> Bool,
        // gravatarFileExtension -> Varchar,
        // signature -> Nullable<Text>,
        // signatureEnableBBCodes -> Bool,
        // signatureEnableHtml -> Bool,
        // signatureEnableSmilies -> Bool,
        // disableSignature -> Bool,
        // disableSignatureReason -> Nullable<Text>,
        // disableSignatureExpires -> Integer,
        lastActivityTime -> Integer,
        // profileHits -> Integer,
        // rankID -> Nullable<Integer>,
        #[sql_name = "userTitle"]
        user_title -> Varchar,

        #[sql_name = "userOnlineGroupID"]
        user_online_group_id -> Nullable<Integer>,
        // activityPoints -> Integer,
        // notificationMailToken -> Varchar,
        // authData -> Varchar,
        // likesReceived -> Integer,
        // socialNetworkPrivacySettings -> Nullable<Text>,
        // wbbPosts -> Integer,
    }
}

table! {
    wcf1_user_group (group_id) {
        #[sql_name = "groupID"]
        group_id -> Integer,

        #[sql_name = "groupName"]
        group_name -> Varchar,
    }
}

table! {
    wcf1_user_to_group (user_id, group_id) {
        #[sql_name = "userID"]
        user_id -> Integer,

        #[sql_name = "groupID"]
        group_id -> Integer,
    }
}

table! {
    wcf1_user_activity_event (event_id) {
        #[sql_name = "eventID"]
        event_id -> Integer,

        #[sql_name = "userID"]
        user_id -> Integer,
        time -> Nullable<Integer>,
    }
}

table! {
    wcf1_branch (branch_id) {
        branch_id -> Integer,
        name -> Varchar,
        image -> Varchar,
        rank_unavailable_image -> Varchar,
        is_disabled -> Bool,
    }
}

table! {
    wcf1_user_option_value (user_id) {
        #[sql_name = "userID"]
        user_id -> Integer,

        #[sql_name = "userOption66"]
        user_avatar_id -> Integer,
    }
}

table! {
    wcf1_user_avatar (avatar_id) {
        #[sql_name = "avatarID"]
        avatar_id -> Integer,

        #[sql_name = "userID"]
        user_id -> Integer,

        #[sql_name = "avatarName"]
        avatar_name -> Varchar,

        #[sql_name = "fileHash"]
        file_hash -> Varchar,
    }
}

table! {
    titan_organizations (id) {
        id -> Integer,
        name -> Varchar,
        slug -> Varchar,
        group_type -> Varchar,
        wcf_user_group_id -> Integer,
        is_enabled -> Bool,
    }
}

joinable!(wcf1_user_option_value -> wcf1_user (user_id));
joinable!(wcf1_user_avatar -> wcf1_user (user_id));
joinable!(wcf1_user_option_value -> wcf1_user_avatar (user_avatar_id));
joinable!(wcf1_user_to_group -> wcf1_user (user_id));
joinable!(wcf1_user_to_group -> wcf1_user_group (group_id));
joinable!(wcf1_user_activity_event -> wcf1_user (user_id));
allow_tables_to_appear_in_same_query!(
    wcf1_user_to_group,
    wcf1_user,
    wcf1_user_group,
    wcf1_user_activity_event,
    wcf1_user_avatar
);