import {ActionType} from './action_types';
import {AppStateAction} from "@titan/actions/types";

export class AuthActions {
  static login (session): AppStateAction {
    return { type: ActionType.AUTH_SESSION_LOGIN, data: session };
  }

  static logout(): AppStateAction {
    return { type: ActionType.AUTH_SESSION_LOGOUT };
  }
}

/** @deprecated */
export function login (session) {
  return { type: ActionType.AUTH_SESSION_LOGIN, data: session };
}


/** @deprecated */
export function logout () {
  return { type: ActionType.AUTH_SESSION_LOGOUT };
}
