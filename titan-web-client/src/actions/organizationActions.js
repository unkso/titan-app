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
} from './actionTypes';

export function addMember (member) {
  return { type: ORGANIZATION_ADD_MEMBER, data: member };
}

export function removeMember (member) {
  return { type: ORGANIZATION_REMOVE_MEMBER, data: member };
}

export function setChainOfCommand (coc) {
  return { type: ORGANIZATION_SET_COC, data: coc };
}

export function clear () {
  return { type: ORGANIZATION_CLEAR };
}

export function setChildren (users) {
  return { type: ORGANIZATION_SET_CHILDREN, data: users };
}

export function setDetails (details) {
  return { type: ORGANIZATION_SET_DETAILS, data: details };
}

export function setMembers (users) {
  return { type: ORGANIZATION_SET_MEMBERS, data: users };
}

export function setReports (reports) {
  return { type: ORGANIZATION_SET_REPORTS, data: reports };
}

export function setRoles (roles) {
  return { type: ORGANIZATION_SET_ROLES, data: roles };
}
