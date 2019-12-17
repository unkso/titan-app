import { DashboardLayout } from '@titan/layouts';
import { ROUTE_TYPE_AUTHENTICATED } from '@titan/lib/routing';
import ProfileScene from '@titan/modules/roster/profile';
import { ExcusesScene } from '@titan/modules/roster/manage_excuses';
import { ListAllUsersScene } from '@titan/modules/roster/ListAllUsersScene';
import { USER_PROFILE_ROUTE } from '@titan/routes';

export default function () {
  return {
    name: 'roster',
    routes: [
      {
        layout: DashboardLayout,
        path: '/roster/excuses',
        scene: ExcusesScene,
        type: ROUTE_TYPE_AUTHENTICATED
      },
      {
        layout: DashboardLayout,
        path: USER_PROFILE_ROUTE,
        scene: ProfileScene,
        type: ROUTE_TYPE_AUTHENTICATED
      },
      {
        layout: DashboardLayout,
        path: '/roster',
        scene: ListAllUsersScene,
        type: ROUTE_TYPE_AUTHENTICATED
      }
    ]
  };
}
