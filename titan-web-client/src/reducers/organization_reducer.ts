import {ActionType} from '@titan/actions/action_types';

const DEFAULT_STATE = {
  children: null,
  details: null,
  members: null,
  reports: null,
  role: null,
  chainOfCommand: null
};

// TODO Replace with interface once API codgen is complete.
// tslint:disable-next-line:no-any
export const organizationReducer = (state: any = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionType.ORGANIZATION_ADD_MEMBER:
      return { ...state, members: [...state.members, action.data] };
    case ActionType.ORGANIZATION_REMOVE_MEMBER:
      return {
        ...state,
        members: state.members.filter(
          member => member !== action.data)
      };
    case ActionType.ORGANIZATION_SET_CHILDREN:
      return { ...state, children: action.data };
    case ActionType.ORGANIZATION_SET_COC:
      return { ...state, chainOfCommand: action.data };
    case ActionType.ORGANIZATION_SET_DETAILS:
      return { ...state, details: action.data };
    case ActionType.ORGANIZATION_SET_MEMBERS:
      return { ...state, members: action.data };
    case ActionType.ORGANIZATION_SET_REPORTS:
      return { ...state, reports: action.data };
    case ActionType.ORGANIZATION_SET_ROLES:
      return { ...state, roles: action.data };
    case ActionType.ORGANIZATION_CLEAR:
      return DEFAULT_STATE;
    default:
      return state;
  }
};
