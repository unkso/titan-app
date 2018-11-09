import axios from 'axios'
import * as authActions from 'titan/actions/authActions'
import { getAppContext } from 'titan/titan'
import _ from 'lodash'

class AuthenticatedService {
  constructor () {
    this.appContext = getAppContext()
    this.httpClient = axios.create({
      baseURL: this.appContext.getConfig().get('api.baseUrl'),
      headers: {
        'content-type': 'application/json'
      }
    })

    this.httpClient.interceptors.request.use(this.authHeadersInterceptor)
    this.httpClient.interceptors.response.use(
      null,
      this.responseErrorInterceptor
    )
  }

  getHttpClient () {
    return this.httpClient
  }

  authHeadersInterceptor (config) {
    let state = this.appContext.getState()
    if (_.isEmpty(state.session.accessToken)) {
      this.appContext.getStore().dispatch(authActions.logout())
      return false
    }

    config.headers = {
      'access-token': state.session.accessToken
    }

    return config
  }

  responseErrorInterceptor (err) {
    if (err.response && err.response.status === 401) {
      this.appContext.getStore().dispatch(authActions.logout())
    }

    return Promise.reject(err)
  }
}

export default AuthenticatedService
