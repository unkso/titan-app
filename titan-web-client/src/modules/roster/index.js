import { createStateReducer } from 'titan/lib/redux/stateReducer';
import { DashboardLayout } from 'titan/layouts';
import { ROUTE_TYPE_AUTHENTICATED } from 'titan/lib/routing';
import BranchesScene from 'titan/modules/roster/branches';
import BranchScene from 'titan/modules/roster/branch';
import ProfileScene from 'titan/modules/roster/profile';
import profileReducer from 'titan/reducers/profileReducer';

export default function() {
  return {
    name: 'roster',
    reducer: createStateReducer({
      profile: profileReducer
    }),
    routes: [
      {
        layout: DashboardLayout,
        path: '/branches',
        scene: BranchesScene,
        type: ROUTE_TYPE_AUTHENTICATED
      },
      {
        layout: DashboardLayout,
        path: '/branch/:slug',
        scene: BranchScene,
        type: ROUTE_TYPE_AUTHENTICATED
      },
      {
        layout: DashboardLayout,
        path: '/roster/:userId',
        scene: ProfileScene,
        type: ROUTE_TYPE_AUTHENTICATED
      }
    ]
  };
}
