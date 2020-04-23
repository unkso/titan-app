import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    UserEventExcuseWithAssoc,
    UserFileEntryWithAssoc,
    UserProfile
} from "@titan/http/api";

/** State for the user profile scene. */
export interface UserProfileState {
    eventExcuses: UserEventExcuseWithAssoc[];
    fileEntries: UserFileEntryWithAssoc[];
    user?: UserProfile;
}

const DEFAULT_STATE: UserProfileState = {
    fileEntries: [],
    eventExcuses: [],
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
        setUser(state, action: PayloadAction<UserProfile>) {
            state.user = action.payload;
        },
    }
});

export const userProfileEventExcusesSelector =
        state => state.userProfile.eventExcuses;
export const userProfileFileEntriesSelector =
        state => state.userProfile.fileEntries;
export const userProfileUserSelector = state => state.userProfile.user;

export const UserProfileActions = UserProfileSlice.actions;
export const UserProfileReducer = UserProfileSlice.reducer;
