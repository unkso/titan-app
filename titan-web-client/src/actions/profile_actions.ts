import {
  PROFILE_SET_FILE_ENTRIES,
  PROFILE_ADD_FILE_ENTRY,
  PROFILE_SET_USER,
  PROFILE_SET_EXCUSES,
  PROFILE_ADD_EXCUSE,
  PROFILE_CLEAR_USER
} from './action_types';

export function setUser (user) {
  return { type: PROFILE_SET_USER, data: user };
}

export function setFileEntries (fileEntries) {
  return { type: PROFILE_SET_FILE_ENTRIES, data: fileEntries };
}

export function addFileEntry (fileEntry) {
  return { type: PROFILE_ADD_FILE_ENTRY, data: fileEntry };
}

export function setExcuses (excuses) {
  return { type: PROFILE_SET_EXCUSES, data: excuses };
}

export function addExcuse (excuse) {
  return { type: PROFILE_ADD_EXCUSE, data: excuse };
}

export function clearUser () {
  return { type: PROFILE_CLEAR_USER };
}
