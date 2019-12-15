import {
  ORGANIZATION_ADD_MEMBER,
  ORGANIZATION_CLEAR,
  ORGANIZATION_REMOVE_MEMBER,
  ORGANIZATION_SET_CHILDREN,
  ORGANIZATION_SET_COC,
  ORGANIZATION_SET_DETAILS,
  ORGANIZATION_SET_REPORTS,
  ORGANIZATION_SET_MEMBERS,
  ORGANIZATION_SET_ROLES
} from '@titan/actions/action_types';

const DEFAULT_STATE = {
  children: null,
  details: null,
  members: null,
  reports: null,
  role: null,
  chainOfCommand: null
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ORGANIZATION_ADD_MEMBER:
      return { ...state, members: [...state.members, action.data] };
    case ORGANIZATION_REMOVE_MEMBER:
      return {
        ...state,
        members: state.members.filter(
          member => member !== action.data)
      };
    case ORGANIZATION_SET_CHILDREN:
      return { ...state, children: action.data };
    case ORGANIZATION_SET_COC:
      return { ...state, chainOfCommand: action.data };
    case ORGANIZATION_SET_DETAILS:
      return { ...state, details: action.data };
    case ORGANIZATION_SET_MEMBERS:
      return { ...state, members: action.data };
    case ORGANIZATION_SET_REPORTS:
      return { ...state, reports: action.data };
    case ORGANIZATION_SET_ROLES:
      return { ...state, roles: action.data };
    case ORGANIZATION_CLEAR:
      return DEFAULT_STATE;
    default:
      return state;
  }
}
