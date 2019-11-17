import axios from 'axios';
import titanConfig from 'titan/config';

class UnauthenticatedService {
  constructor () {
    this.httpClient = axios.create({
      baseURL: titanConfig.get('api.baseUrl'),
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
