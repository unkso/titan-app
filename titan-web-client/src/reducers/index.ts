import {combineReducers} from "redux";
import {authReducer} from "@titan/reducers/auth_reducer";
import {organizationReducer} from "@titan/reducers/organization_reducer";
import {fileEntriesReducer} from "@titan/reducers/file_entries_reducer";
import {profileReducer} from "@titan/reducers/profile_reducer";

export const rootReducer = combineReducers({
    auth: combineReducers({
        session: authReducer,
    }),
    organization: organizationReducer,
    roster: combineReducers({
        fileEntries: fileEntriesReducer,
        profile: profileReducer,
    })
});
