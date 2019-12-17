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
