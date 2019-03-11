import { DashboardLayout } from 'titan/layouts';
import { ROUTE_TYPE_AUTHENTICATED } from 'titan/lib/routing';
import OrganizationScene from './organizationScene';
import OrganizationsListScene from './organizationsListScene';

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
        path: '/organizations/:slug',
        scene: OrganizationScene,
        type: ROUTE_TYPE_AUTHENTICATED
      }
    ]
  };
}
