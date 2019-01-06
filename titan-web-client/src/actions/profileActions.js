import {
  PROFILE_SET_FILE_ENTRIES,
  PROFILE_ADD_FILE_ENTRY,
  PROFILE_SET_USER
} from './actionTypes';

export function setUser (user) {
  return { type: PROFILE_SET_USER, data: user };
}

export function setFileEntries (fileEntries) {
  return { type: PROFILE_SET_FILE_ENTRIES, data: fileEntries };
}

export function addFileEntry (fileEntry) {
  return { type: PROFILE_ADD_FILE_ENTRY, data: fileEntry };
}
