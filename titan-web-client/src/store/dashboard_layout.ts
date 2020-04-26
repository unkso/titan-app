import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum DashboardLayoutPageMenuState {
    COLLAPSED,
    EXPANDED,
}

export interface DashboardLayoutPageMenuItem {
    label: string,
    path: string;
}

export interface DashboardLayoutPageMenu {
    subheaderLabel: string;
    items: DashboardLayoutPageMenuItem[];
}

/** State for the dashboard layout. */
export interface DashboardLayoutState {
    pageMenu?: DashboardLayoutPageMenu,
    pageMenuState: DashboardLayoutPageMenuState,
}

const DEFAULT_STATE: DashboardLayoutState = {
    pageMenuState: DashboardLayoutPageMenuState.EXPANDED,
};

/** Manages the state for ${DashboardLayout}. */
const DashboardLayoutSlice = createSlice({
    name: 'dashboardLayout',
    initialState: DEFAULT_STATE,
    reducers: {
        setPageMenu(state, action: PayloadAction<DashboardLayoutPageMenu|undefined>) {
            state.pageMenu = action.payload;
        },
        setPageMenuState(state, action: PayloadAction<DashboardLayoutPageMenuState>) {
            state.pageMenuState = action.payload;
        }
    }
});

export const dashboardLayoutPageMenuSelector =
        state => state.dashboardLayout.pageMenu;
export const dashboardLayoutPageMenuStateSelector =
        state => state.dashboardLayout.pageMenuState;

export const DashboardLayoutActions = DashboardLayoutSlice.actions;
export const DashboardLayoutReducer = DashboardLayoutSlice.reducer;
