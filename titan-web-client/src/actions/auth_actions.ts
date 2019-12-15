import { AUTH_SESSION_LOGIN, AUTH_SESSION_LOGOUT } from './action_types';

export function login (session) {
  return { type: AUTH_SESSION_LOGIN, data: session };
}

export function logout () {
  return { type: AUTH_SESSION_LOGOUT };
}
