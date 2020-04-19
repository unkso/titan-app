import axios from 'axios';
import * as authActions from '@titan/actions/auth_actions';
import {config} from '@titan/lib/config';
import {AppStore} from '@titan/store';
import { AuthUserActions } from '@titan/store/auth_user';

class AuthenticatedService {
  constructor () {
    this.httpClient = axios.create({
      baseURL: config.get('api.baseUrl'),
      headers: {
        'content-type': 'application/json'
      }
    });

    this.httpClient.interceptors.request.use((config) => {
      return this.authHeadersInterceptor(config);
    });

    this.httpClient.interceptors.response.use(
      null,
      this.responseErrorInterceptor
    );
  }

  getHttpClient () {
    return this.httpClient;
  }

  authHeadersInterceptor (config) {
    if (AppStore.getState().authUser.credentials) {
      AppStore.dispatch(AuthUserActions.logout());
      return false;
    }

    config.headers = {
      'x-api-key': state.auth.session.token
    };

    return config;
  }

  responseErrorInterceptor (err) {
    if (err.response && err.response.status === 401) {
      AppStore.dispatch(authActions.logout());
    }

    return Promise.reject(err);
  }
}

export default AuthenticatedService;
