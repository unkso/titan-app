import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    Organization,
    UserProfile,
    OrganizationRoleWithAssoc,
} from "@titan/http/api";

/** State for the user profile scene. */
export interface OrganizationState {
    children: Organization[];
    chainOfCommand: OrganizationRoleWithAssoc[];
    members: UserProfile[];
    organization?: Organization;
    roles: OrganizationRoleWithAssoc[];
}

const DEFAULT_STATE: OrganizationState = {
    chainOfCommand: [],
    children: [],
    members: [],
    roles: [],
};

/** Manages the state for ${Organization}. */
const OrganizationSlice = createSlice({
    name: 'organization',
    initialState: DEFAULT_STATE,
    reducers: {
        setChainOfCommand(state, action: PayloadAction<OrganizationRoleWithAssoc[]>) {
            state.chainOfCommand = action.payload;
        },
        setChildren(state, action: PayloadAction<Organization[]>) {
            state.children = action.payload;
        },
        setRoles(state, action: PayloadAction<OrganizationRoleWithAssoc[]>) {
            state.roles = action.payload;
        },
        setMembers(state, action: PayloadAction<UserProfile[]>) {
            state.members = action.payload;
        },
        setOrganization(state, action: PayloadAction<Organization|undefined>) {
            state.organization = action.payload;
        },
    }
});

export const organizationChainOfCommandSelector =
        state => state.organization.chainOfCommand;
export const organizationChildrenSelector =
    state => state.organization.children;
export const organizationMembersSelector =
    state => state.organization.members;
export const organizationModelSelector =
    state => state.organization.organization;
export const organizationRankedRolesSelector = state =>
    state.organization.roles.filter(role => role.rank !== undefined);
export const organizationUnrankedRolesSelector = state =>
    state.organization.roles.filter(role => role.rank === undefined);

export const OrganizationActions = OrganizationSlice.actions;
export const OrganizationReducer = OrganizationSlice.reducer;
