import WebsiteLayout from './layouts/WebsiteLayout'
import EmptyDarkLayout from './layouts/EmptyDarkLayout'
import TitanAuth from 'titan-auth'
import TitanDashboard from 'titan-dashboard'

export default {
  name: 'titan-core',
  layouts: {
    website: WebsiteLayout,
    empty: EmptyDarkLayout
  },
  dependencies: [
    TitanAuth,
    TitanDashboard
  ]
}
