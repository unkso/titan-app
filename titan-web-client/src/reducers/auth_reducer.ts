import {ActionType} from '@titan/actions/action_types';
import {AclMap} from "@titan/lib/acl";

interface SessionState {
  acl: AclMap;
  user: {};
  wcf_username: string;
  wcf_user_title: string;
  roles: string[];
  token: string;
}

/**
 * Convert a list of ACL options into a map, where in the keys is in the format
 * of "category_name:option_name".
 *
 * @param {{id, option_name, category_name}} acl - A list of ACL options.
 * @returns {Map<string, {id, option_name, category_name}>}
 */
function buildAclMap (acl): AclMap {
  // Reduce the list of ACL options into key/value pairs. Use a vanilla object
  // to construct the map because the es6 Map object loses its values when
  // serialized to JSON.
  return acl.reduce((map, option) => {
    map[`${option.category_name}:${option.option_name}`] = option;
    return map;
  }, {});
}

export const authReducer = (state: SessionState|null = null, action) => {
  switch (action.type) {
    case ActionType.AUTH_SESSION_LOGIN:
      const { acl, ...rest } = action.data;
      return { ...rest, acl: buildAclMap(acl) };
    case ActionType.AUTH_SESSION_LOGOUT:
      return null;
    default:
      return state;
  }
};
