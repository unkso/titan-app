import axios from 'axios';
import { getAppContext } from 'titan/titan';

class UnauthenticatedService {
  constructor () {
    this.appContext = getAppContext();
    this.httpClient = axios.create({
      baseURL: this.appContext.getConfig().get('api.baseUrl'),
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  getHttpClient () {
    return this.httpClient;
  }
}

export default UnauthenticatedService;
