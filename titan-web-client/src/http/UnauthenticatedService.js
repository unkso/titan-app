import axios from 'axios';
import {config} from '@titan/lib/config';

class UnauthenticatedService {
  constructor () {
    this.httpClient = axios.create({
      baseURL: config.get('api.baseUrl'),
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
