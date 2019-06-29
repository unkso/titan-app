import { DashboardLayout } from 'titan/layouts';
import { ROUTE_TYPE_AUTHENTICATED } from 'titan/lib/routing';
import { OrganizationDetailScene } from './organizationDetailScene';
import OrganizationsListScene from './organizationsListScene';
import ManageUnacknowledgedReportsScene from './manageUnacknowledgedReportsScene';

export default function () {
  return {
    name: 'organizations',
    routes: [
      {
        layout: DashboardLayout,
        path: '/organizations',
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
        path: '/organizations/:slug',
        scene: OrganizationDetailScene,
        type: ROUTE_TYPE_AUTHENTICATED
      }
    ]
  };
}
