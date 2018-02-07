import LoginScene from './scenes/LoginScene'
import DashboardLayout from 'titan-core/layouts/DashboardLayout'

export default {
  'auth:login': {
    route: '/auth/login',
    layout: 'empty',
    scene: LoginScene,
    components: {
      mainMenu: [],
      content: [
        {
          component: '<Component>',
          priority: 1
        }
      ]
    }
  }
}
