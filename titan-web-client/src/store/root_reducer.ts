import {combineReducers} from "redux";
import {AuthUserReducer} from "@titan/store/auth_user";
import {DashboardLayoutReducer} from "@titan/store/dashboard_layout";
import {UserProfileReducer} from "@titan/store/profile";

/** The top-most reducer containing the entire application state. */
export const rootReducer = combineReducers({
    authUser: AuthUserReducer,
    dashboardLayout: DashboardLayoutReducer,
    userProfile: UserProfileReducer,
});

/** A type representing the entire application state. */
export type AppState = ReturnType<typeof rootReducer>;
