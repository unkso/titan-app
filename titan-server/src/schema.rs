table! {
    wcf1_user (user_id) {
        #[sql_name = "userID"]
        user_id -> Integer,
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
    wcf1_acl_option_category (id) {
        #[sql_name = "categoryID"]
        id -> Integer,

        #[sql_name = "categoryName"]
        category_name -> Varchar,
    }
}

table! {
    wcf1_acl_option (id) {
        #[sql_name = "optionID"]
        id -> Integer,

        #[sql_name = "optionName"]
        option_name -> Varchar,

        #[sql_name = "categoryName"]
        category_name -> Varchar,
    }
}

table! {
    wcf1_acl_option_to_user (option_id, user_id) {
        #[sql_name = "optionID"]
        option_id -> Integer,

        #[sql_name = "userID"]
        user_id -> Integer,

        #[sql_name = "optionValue"]
        option_value -> Bool,
    }
}

table! {
    wcf1_acl_option_to_group (option_id, group_id) {
        #[sql_name = "optionID"]
        option_id -> Integer,

        #[sql_name = "groupID"]
        group_id -> Integer,

        #[sql_name = "optionValue"]
        option_value -> Bool,
    }
}

table! {
    organizations (id) {
        id -> Integer,
        name -> Varchar,
        slug -> Varchar,
        avatar_url -> Text,
        group_type -> Varchar,
        wcf_user_group_id -> Integer,
        is_enabled -> Bool,
    }
}

table! {
    users (id) {
        id -> Integer,
        wcf_id -> Integer,
        legacy_player_id -> Nullable<Integer>,
        rank_id -> Nullable<Integer>,
        username -> Varchar,
        orientation -> Nullable<Integer>,
        bct_e0 -> Nullable<Integer>,
        bct_e1 -> Nullable<Integer>,
        bct_e2 -> Nullable<Integer>,
        bct_e3 -> Nullable<Integer>,
        loa -> Nullable<Integer>,
        a15 -> Nullable<Integer>,
        date_joined -> Nullable<Datetime>,
        date_created -> Datetime,
        date_modified -> Nullable<Datetime>,
        modified_by -> Nullable<Integer>,
        last_activity -> Nullable<Datetime>,
        is_active -> Bool,
    }
}

table! {
    user_file_entry_types (id) {
        id -> Integer,
        name -> Varchar,
    }
}

table! {
    user_file_entries (id) {
        id -> Integer,
        user_file_entry_type_id -> Integer,
        user_id -> Integer,
        start_date -> Datetime,
        end_date -> Nullable<Datetime>,
        comments -> Nullable<Varchar>,
        date_modified -> Datetime,
        modified_by -> Integer,
    }
}

table! {
    event_types (id) {
        id -> Integer,
        name -> Varchar,
    }
}

table! {
    user_event_excuses (id) {
          id -> Integer,
          user_id -> Integer,
          event_type_id -> Integer,
          event_date -> Datetime,
          comments -> Mediumtext,
          ack_user_id -> Nullable<Integer>,
          ack_date -> Nullable<Datetime>,
          ack_comments -> Nullable<Mediumtext>,
          date_created -> Datetime,
          date_modified -> Datetime,
    }
}

joinable!(user_file_entries -> user_file_entry_types (user_file_entry_type_id));
joinable!(user_event_excuses -> event_types (event_type_id));
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
    wcf1_user_avatar,
);

allow_tables_to_appear_in_same_query!(
    user_file_entries,
    user_file_entry_types,
);

allow_tables_to_appear_in_same_query!(
    wcf1_user_to_group,
    wcf1_acl_option_to_group
);

allow_tables_to_appear_in_same_query!(
    user_event_excuses,
    event_types,
);