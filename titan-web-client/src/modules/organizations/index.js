import { DashboardLayout } from '@titan/layouts';
import { ROUTE_TYPE_AUTHENTICATED } from '@titan/lib/routing';
import { Oragnization_detail_scene } from './oragnization_detail_scene';
import OrganizationsListScene from './organization_list_scene';
import ManageUnacknowledgedReportsScene from './manage_unacknowledged_reports';
import {
  ORGANIZATION_DETAILS_ROUTE,
  ORGANIZATIONS_LIST_ROUTE
} from '@titan/routes';

export default function () {
  return {
    name: 'organization',
    routes: [
      {
        layout: DashboardLayout,
        path: ORGANIZATIONS_LIST_ROUTE,
        scene: OrganizationsListScene,
        type: ROUTE_TYPE_AUTHENTICATED
      },
      {
        layout: DashboardLayout,
        path: '/organizations/unacknowledged-reports',
        scene: ManageUnacknowledgedReportsScene,
        type: ROUTE_TYPE_AUTHENTICATED
      },
      {
        layout: DashboardLayout,
        path: ORGANIZATION_DETAILS_ROUTE,
        scene: Oragnization_detail_scene,
        type: ROUTE_TYPE_AUTHENTICATED
      }
    ]
  };
}
