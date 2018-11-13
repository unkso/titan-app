import {
  AUTH_SESSION_LOGIN,
  AUTH_SESSION_LOGOUT
} from 'titan/actions/actionTypes';

export default function (state = null, action) {
  switch (action.type) {
    case AUTH_SESSION_LOGIN:
      return action.data;
    case AUTH_SESSION_LOGOUT:
      return null;
    default:
      return state;
  }
}
