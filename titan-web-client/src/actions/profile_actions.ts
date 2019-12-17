import {ActionType} from './action_types';

export function setUser (user) {
  return { type: ActionType.PROFILE_SET_USER, data: user };
}

export function setFileEntries (fileEntries) {
  return { type: ActionType.PROFILE_SET_FILE_ENTRIES, data: fileEntries };
}

export function addFileEntry (fileEntry) {
  return { type: ActionType.PROFILE_ADD_FILE_ENTRY, data: fileEntry };
}

export function setExcuses (excuses) {
  return { type: ActionType.PROFILE_SET_EXCUSES, data: excuses };
}

export function addExcuse (excuse) {
  return { type: ActionType.PROFILE_ADD_EXCUSE, data: excuse };
}

export function clearUser () {
  return { type: ActionType.PROFILE_CLEAR_USER };
}
