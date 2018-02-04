import LoginScene from './scenes/LoginScene'
import DashboardLayout from 'titan-core/layouts/DashboardLayout'

export default {
  'auth:login': {
    route: '/auth/login',
    middleware: [],
    layout: DashboardLayout,
    scene: LoginScene,
    components: {
      content: [
        {
          component: '<Component>',
          priority: 1
        }
      ]
    }
  }
}
