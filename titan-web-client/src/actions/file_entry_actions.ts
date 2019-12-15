import { FILE_ENTRIES_SET_TYPES } from '@titan/actions/action_types';

export function setTypes (types) {
  return { type: FILE_ENTRIES_SET_TYPES, data: types };
}
