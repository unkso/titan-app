import {combineReducers} from "redux";
import {AuthUserReducer} from "@titan/store/auth_user";
import {DashboardLayoutReducer} from "@titan/store/dashboard_layout";
import {UserProfileReducer} from "@titan/store/profile";
import {OrganizationReducer} from "@titan/store/organization";

/** The top-most reducer containing the entire application state. */
export const rootReducer = combineReducers({
    authUser: AuthUserReducer,
    dashboardLayout: DashboardLayoutReducer,
    userProfile: UserProfileReducer,
    organization: OrganizationReducer,
});

/** A type representing the entire application state. */
export type AppState = ReturnType<typeof rootReducer>;
