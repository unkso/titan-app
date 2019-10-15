import { FILE_ENTRIES_SET_TYPES } from 'titan/actions/actionTypes';

const DEFAULT_STATE = {
  types: null
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FILE_ENTRIES_SET_TYPES:
      return { ...state, types: action.data };
    default:
      return state;
  }
}
