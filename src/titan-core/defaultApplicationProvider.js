import DashboardLayout from './layouts/DashboardLayout'
import WebsiteLayout from './layouts/WebsiteLayout'
import EmptyDarkLayout from './layouts/EmptyDarkLayout'

export default {
  name: 'titan-core',
  layouts: {
    dashboard: DashboardLayout,
    website: WebsiteLayout,
    empty: EmptyDarkLayout
  }
}
