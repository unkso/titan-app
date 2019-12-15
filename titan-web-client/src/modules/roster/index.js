import { createStateReducer } from '@titan/lib/redux/state_reducer';
import { DashboardLayout } from '@titan/layouts';
import { ROUTE_TYPE_AUTHENTICATED } from '@titan/lib/routing';
import ProfileScene from '@titan/modules/roster/profile';
import { ExcusesScene } from '@titan/modules/roster/manage_excuses';
import profileReducer from '@titan/reducers/profile_reducer';
import { ListAllUsersScene } from '@titan/modules/roster/ListAllUsersScene';
import { USER_PROFILE_ROUTE } from '@titan/routes';
import fileEntriesReducer from '@titan/reducers/file_entries_reducer';

export default function () {
  return {
    name: 'roster',
    reducer: createStateReducer({
      fileEntries: fileEntriesReducer,
      profile: profileReducer
    }),
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
