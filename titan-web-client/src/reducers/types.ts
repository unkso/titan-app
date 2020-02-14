import {AclMap} from '@titan/lib/acl/types';

export interface AuthSessionState {
    acl: AclMap;
    user: {};
    wcf_username: string;
    wcf_user_title: string;
    roles: string[];
    token: string;
}

export interface AuthState {
    session: AuthSessionState;
}

export interface AppState {
    auth?: AuthState;
}
