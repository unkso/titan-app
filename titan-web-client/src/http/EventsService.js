import AuthenticatedService from 'titan/http/AuthenticatedService';

class EventsService {
  constructor () {
    this.httpService = new AuthenticatedService();
    this.httpClient = this.httpService.getHttpClient();
  }

  listEventTypes () {
    return this.httpClient.get('/events/event-types');
  }
}

export default EventsService;
