import { DashboardLayout } from 'titan/layouts';
import { ROUTE_TYPE_AUTHENTICATED } from 'titan/lib/routing';
import { OrganizationDetailScene } from './organizationDetailScene';
import OrganizationsListScene from './organizationsListScene';
import ManageUnacknowledgedReportsScene from './manageUnacknowledgedReportsScene';
import {
  ORGANIZATION_DETAILS_ROUTE,
  ORGANIZATIONS_LIST_ROUTE
} from 'titan/routes';

export default function () {
  return {
    name: 'organizations',
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
        scene: OrganizationDetailScene,
        type: ROUTE_TYPE_AUTHENTICATED
      }
    ]
  };
}
