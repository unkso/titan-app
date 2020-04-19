import {configureStore} from "@reduxjs/toolkit";
import {AppState, rootReducer} from "@titan/store/root_reducer";

function getInitialState(): AppState|undefined {
    const sessionToken = localStorage.getItem('titan_session_token');
    if (!sessionToken) {
        return undefined;
    }
    return {
        authUser: {
            credentials: {
                token: sessionToken,
            },
        }
    };
}

/** Data AppStore used to dispatch actions and update app state.*/
export const AppStore = configureStore({
    reducer: rootReducer,
    preloadedState: getInitialState(),
});

/** The types accepted by {@link index.dispatch} method. */
export type AppDispatch = typeof AppStore.dispatch;
