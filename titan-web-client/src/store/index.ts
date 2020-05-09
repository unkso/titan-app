import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "@titan/store/root_reducer";

/** Data AppStore used to dispatch actions and update app state. */
export const AppStore = configureStore({
    reducer: rootReducer,
});

/** The types accepted by {@link index.dispatch} method. */
export type AppDispatch = typeof AppStore.dispatch;
