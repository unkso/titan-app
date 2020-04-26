import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    UserEventExcuseWithAssoc,
    UserFileEntryWithAssoc, UserOrganizationMembership,
    UserProfile
} from "@titan/http/api";

/** State for the user profile scene. */
export interface UserProfileState {
    eventExcuses: UserEventExcuseWithAssoc[];
    fileEntries: UserFileEntryWithAssoc[];
    organizationMemberships: UserOrganizationMembership[];
    user?: UserProfile;
}

const DEFAULT_STATE: UserProfileState = {
    eventExcuses: [],
    fileEntries: [],
    organizationMemberships: [],
};

/** Manages the state for ${UserProfile}. */
const UserProfileSlice = createSlice({
    name: 'userProfile',
    initialState: DEFAULT_STATE,
    reducers: {
        setEventExcuses(state, action: PayloadAction<UserEventExcuseWithAssoc[]>) {
            state.eventExcuses = action.payload;
        },
        setFileEntries(state, action: PayloadAction<UserFileEntryWithAssoc[]>) {
            state.fileEntries = action.payload;
        },
        setOrganizationMemberships(state, action: PayloadAction<UserOrganizationMembership[]>) {
            state.organizationMemberships = action.payload;
        },
        setUser(state, action: PayloadAction<UserProfile>) {
            state.user = action.payload;
        },
    }
});

export const userProfileEventExcusesSelector =
        state => state.userProfile.eventExcuses;
export const userProfileFileEntriesSelector =
        state => state.userProfile.fileEntries;
export const userProfileOrganizationMembershipsSelector =
    state => state.userProfile.organizationMemberships;
export const userProfileUserSelector = state => state.userProfile.user;

export const UserProfileActions = UserProfileSlice.actions;
export const UserProfileReducer = UserProfileSlice.reducer;
