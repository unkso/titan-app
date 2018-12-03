import AuthenticatedService from 'titan/http/AuthenticatedService';

class UsersService {
  constructor () {
    this.httpService = new AuthenticatedService();
    this.httpClient = this.httpService.getHttpClient();
  }

  /**
   * Gets a user by ID.
   *
   * @param userId - Titan user ID.
   */
  getUser (userId) {
    return this.httpClient.get(`/users/${userId}`);
  }

  /**
   * Lists all of a user's file entries.
   *
   * @param {string} userId - Titan user ID.
   * @returns {Promise}
   */
  listUserFiles (userId) {
    return this.httpClient.get(`/users/${userId}/file-entries`);
  }
}

export default UsersService;
