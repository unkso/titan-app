import {ActionType} from '@titan/actions/action_types';

export function setTypes (types) {
  return { type: ActionType.FILE_ENTRIES_SET_TYPES, data: types };
}
