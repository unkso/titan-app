import {ActionType} from './action_types';

export function login (session) {
  return { type: ActionType.AUTH_SESSION_LOGIN, data: session };
}

export function logout () {
  return { type: ActionType.AUTH_SESSION_LOGOUT };
}
