import {ActionType} from '@titan/actions/action_types';

interface FileEntryType {
  id: number;
  name: string;
}

interface FileEntriesState {
  types: FileEntryType[]|null;
}

const DEFAULT_STATE = {
  types: null
};

export const fileEntriesReducer = (state: FileEntriesState = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionType.FILE_ENTRIES_SET_TYPES:
      return { ...state, types: action.data };
    default:
      return state;
  }
};
