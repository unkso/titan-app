import {combineReducers} from "redux";
import {AuthUserReducer} from "@titan/store/auth_user";

/** The top-most reducer containing the entire application state. */
export const rootReducer = combineReducers({
    authUser: AuthUserReducer,
});

/** A type representing the entire application state. */
export type AppState = ReturnType<typeof rootReducer>;
