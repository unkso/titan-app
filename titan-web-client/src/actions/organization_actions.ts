import {ActionType} from "./action_types";

export function addMember (member) {
  return { type: ActionType.ORGANIZATION_ADD_MEMBER, data: member };
}

export function removeMember (member) {
  return { type: ActionType.ORGANIZATION_REMOVE_MEMBER, data: member };
}

export function setChainOfCommand (coc) {
  return { type: ActionType.ORGANIZATION_SET_COC, data: coc };
}

export function clear () {
  return { type: ActionType.ORGANIZATION_CLEAR };
}

export function setChildren (users) {
  return { type: ActionType.ORGANIZATION_SET_CHILDREN, data: users };
}

export function setDetails (details) {
  return { type: ActionType.ORGANIZATION_SET_DETAILS, data: details };
}

export function setMembers (users) {
  return { type: ActionType.ORGANIZATION_SET_MEMBERS, data: users };
}

export function setReports (reports) {
  return { type: ActionType.ORGANIZATION_SET_REPORTS, data: reports };
}

export function setRoles (roles) {
  return { type: ActionType.ORGANIZATION_SET_ROLES, data: roles };
}
