import {
  PROFILE_SET_USER,
  PROFILE_SET_FILE_ENTRIES
} from 'titan/actions/actionTypes';

const DEFAULT_STATE = {
  user: null,
  file_entries: []
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case PROFILE_SET_USER:
      return { ...state, user: action.data };
    case PROFILE_SET_FILE_ENTRIES:
      return { ...state, file_entries: action.data };
    default:
      return state;
  }
}
