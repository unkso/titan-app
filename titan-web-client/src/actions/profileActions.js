import {
  PROFILE_SET_FILE_ENTRIES,
  PROFILE_SET_USER
} from './actionTypes';

export function setUser (user) {
  return { type: PROFILE_SET_USER, data: user };
}

export function setFileEntries (fileEntries) {
  return { type: PROFILE_SET_FILE_ENTRIES, data: fileEntries };
}
