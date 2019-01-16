import { createStateReducer } from 'titan/lib/redux/stateReducer';
import { DashboardLayout } from 'titan/layouts';
import { ROUTE_TYPE_AUTHENTICATED } from 'titan/lib/routing';
import OverviewScene from './overview';

export default function () {
  return {
    name: 'organizations',
    reducer: createStateReducer([]),
    routes: [
      {
        layout: DashboardLayout,
        path: '/organizations/:type/:name',
        scene: OverviewScene,
        type: ROUTE_TYPE_AUTHENTICATED
      }
    ]
  };
}
