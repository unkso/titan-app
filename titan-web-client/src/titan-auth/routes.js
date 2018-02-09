import LoginScene from './scenes/LoginScene'

export default {
  'auth:login': {
    path: '/auth/login',
    layout: 'empty',
    scene: LoginScene,
    exact: true
  }
}
