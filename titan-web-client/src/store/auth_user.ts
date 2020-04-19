import {AclOptionToken} from "@titan/lib/acl/types";
import {
    UserOrganizationMembership,
    UserProfile
} from "@titan/http/api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Credentials used to authenticate the user when sending requests
 * the the server.
 */
export interface AuthUserCredentials {
    token: string;
}

/** State for the authenticated user. */
export interface AuthUserState {
    /**
     * A list of ACL permissions granted to the authenticated user.
     */
    aclOptions?: AclOptionToken[];
    /**
     * Credentials used to authenticate the user when sending requests
     * the the server.
     */
    credentials?: AuthUserCredentials;
    /**
     * A list of organizations where the authenticated user holds a
     * leadership role or is a member.
     */
    organizations?: UserOrganizationMembership[];
    /** The authenticated user's profile information. */
    user?: UserProfile;
}

const DEFAULT_STATE: AuthUserState = {
    aclOptions: [],
    organizations: [],
};

/** Manages the state for the authenticated user. */
const AuthUserSlice = createSlice({
    name: 'authUser',
    initialState: DEFAULT_STATE,
    reducers: {
        login(state, action: PayloadAction<AuthUserCredentials>) {
            state.credentials = action.payload;
        },
        logout(state) {
            state = DEFAULT_STATE;
        },
        setAclOptions(state, action: PayloadAction<AclOptionToken[]>) {
            state.aclOptions = action.payload;
        },
        setOrganizations(state, action: PayloadAction<UserOrganizationMembership[]>) {
            state.organizations = action.payload;
        },
        setProfile(state, action: PayloadAction<UserProfile>) {
            state.user = action.payload;
        },
    }
});

export const authUserSelector = state => state.authUser.user;
export const authOrganizationsSelector = state => state.authUser.organizations;
export const authTokenSelector =
        state => state.authUser.credentials?.token;

export const AuthUserActions = AuthUserSlice.actions;
export const AuthUserReducer = AuthUserSlice.reducer;
