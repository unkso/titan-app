import LoginScene from './scenes/LoginScene'
import DashboardLayout from 'titan-core/layouts/DashboardLayout'

export default {
  'auth:login': {
    path: '/auth/login',
    layout: 'empty',
    scene: LoginScene,
    exact: true
  }
}
