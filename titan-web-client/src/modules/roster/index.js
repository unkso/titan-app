import { createStateReducer } from 'titan/lib/redux/stateReducer';
import { DashboardLayout } from 'titan/layouts';
import { ROUTE_TYPE_AUTHENTICATED } from 'titan/lib/routing';
import BranchScene from 'titan/modules/roster/branch';

export default function () {
  return {
    name: 'users',
    reducer: createStateReducer([]),
    routes: [
      {
        layout: DashboardLayout,
        path: '/branch/:slug',
        scene: BranchScene,
        type: ROUTE_TYPE_AUTHENTICATED
      }
    ]
  };
}
