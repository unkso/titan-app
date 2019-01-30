import UnauthenticatedService from 'titan/http/UnauthenticatedService';

class AuthService {
  constructor () {
    this.httpService = new UnauthenticatedService();
    this.httpClient = this.httpService.getHttpClient();
  }

  login (userId, token) {
    return this.httpClient.post('/auth/woltlab', {
      user_id: userId,
      cookie_password: token
    });
  }
}

export default AuthService;
