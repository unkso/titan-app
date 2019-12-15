import { createStateReducer } from '@titan/lib/redux/state_reducer';
import authReducer from '@titan/reducers/auth_reducer';
import { EmptyDarkLayout } from '@titan/layouts';
import LoginScene from './login';
import { LogoutScene } from './logout';
import {
  ROUTE_TYPE_AUTHENTICATED,
  ROUTE_TYPE_UNAUTHENTICATED
} from '../../lib/routing';

export default function () {
  return {
    name: 'auth',
    reducer: createStateReducer({
      session: authReducer
    }),
    routes: [
      {
        layout: EmptyDarkLayout,
        path: '/auth/login',
        scene: LoginScene,
        type: ROUTE_TYPE_UNAUTHENTICATED
      },
      {
        layout: EmptyDarkLayout,
        path: '/auth/logout',
        scene: LogoutScene,
        type: ROUTE_TYPE_AUTHENTICATED
      }
    ]
  };
}
