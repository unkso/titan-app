import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Organization, UserProfile, OrganizationRoleWithAssoc} from "@titan/http/api";

/** State for the user profile scene. */
export interface OrganizationState {
    children: Organization[];
    chainOfCommand: OrganizationRoleWithAssoc[];
    members: UserProfile[];
    organization?: Organization;
}

const DEFAULT_STATE: OrganizationState = {
    chainOfCommand: [],
    children: [],
    members: [],
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

export const OrganizationActions = OrganizationSlice.actions;
export const OrganizationReducer = OrganizationSlice.reducer;
