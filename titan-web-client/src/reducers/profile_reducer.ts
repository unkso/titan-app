import _ from 'lodash';
import {ActionType} from '@titan/actions/action_types';

const DEFAULT_STATE = {
  user: null,
  excuses: [],
  file_entries: []
};

function addFileEntry (fileEntry, fileEntries) {
  fileEntries.push(fileEntry);
  fileEntries.sort((x, y) => {
    // Sort with newer entries at the beginning.
    return x.start_date < y.start_date ? 1 : -1;
  });

  return fileEntries;
}

function addExcuse (excuse, excusesList) {
  excusesList.push(excuse);
  excusesList.sort((x, y) => {
    return x.event_date < y.event_date ? 1 : -1;
  });

  return excusesList;
}

// TODO Replace with interface once API codgen is complete.
// tslint:disable-next-line:no-any
export const profileReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionType.PROFILE_SET_USER:
      return { ...state, user: action.data };
    case ActionType.PROFILE_SET_FILE_ENTRIES:
      return { ...state, file_entries: action.data };
    case ActionType.PROFILE_ADD_FILE_ENTRY:
      return {
        ...state,
        file_entries: addFileEntry(
          action.data,
          _.map(state.file_entries, _.clone)
        )
      };
    case ActionType.PROFILE_SET_EXCUSES:
      return { ...state, excuses: action.data };
    case ActionType.PROFILE_ADD_EXCUSE:
      return {
        ...state,
        excuses: addExcuse(action.data, _.map(state.excuses, _.clone))
      };
    case ActionType.PROFILE_CLEAR_USER:
      return DEFAULT_STATE;
    default:
      return state;
  }
};
