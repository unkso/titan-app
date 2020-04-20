import {AclOptionToken} from "@titan/lib/acl/types";
import {
    OrganizationRole,
    UserOrganizationMembership,
    UserProfile
} from "@titan/http/api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@titan/store/root_reducer";

/**
 * Credentials used to authenticate the user when sending requests
 * the the server.
 */
export interface AuthUserCredentials {
    userId: number;
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

function getStoredAuthUserCredentials(): AuthUserCredentials|undefined {
    const serializedCredentials: string|null =
        localStorage.getItem('titan_credentials');

    if (serializedCredentials) {
        const parsedCredentials: AuthUserCredentials = JSON.parse(serializedCredentials);
        if (parsedCredentials.token && parsedCredentials.userId) {
            return parsedCredentials;
        }
    }

    return undefined;
}

const DEFAULT_STATE: AuthUserState = {
    aclOptions: [],
    credentials: getStoredAuthUserCredentials(),
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
        setUser(state, action: PayloadAction<UserProfile>) {
            state.user = action.payload;
        },
    }
});

export const authOrganizationRolesSelector = state =>
    state.authUser.organizations
        .filter(org => !!org.role)
        .map(org => org.role);
export const authUserSelector = state => state.authUser.user;
export const authOrganizationsSelector =
        state => state.authUser.organizations;
export const authCredentialsSelector =
        state => state.authUser.credentials;

export const AuthUserActions = AuthUserSlice.actions;
export const AuthUserReducer = AuthUserSlice.reducer;
