import axios from 'axios';
import * as authActions from '@titan/actions/auth_actions';
import {config} from '@titan/lib/config';
import _ from 'lodash';
import { getStoreInstance } from '@titan/lib/redux';

class AuthenticatedService {
  constructor () {
    this.store = getStoreInstance().getStore();
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
    const state = this.store.getState();

    if (_.isEmpty(state.auth.session.token)) {
      this.store.dispatch(authActions.logout());
      return false;
    }

    config.headers = {
      'x-api-key': state.auth.session.token
    };

    return config;
  }

  responseErrorInterceptor (err) {
    if (err.response && err.response.status === 401) {
      this.store.dispatch(authActions.logout());
    }

    return Promise.reject(err);
  }
}

export default AuthenticatedService;
