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
   * Lists file entry types.
   *
   * @returns {*}
   */
  listUserFileEntryTypes () {
    return this.httpClient.get(`/users/file-entry-types`);
  }

  /**
   * Save file entry.
   *
   * @param {string} userId - Titan user ID.
   * @param {{start_date, end_date, comments, file_entry_type_id}} fileEntry
   * @returns {Promise}
   */
  saveUserFileEntry (userId, fileEntry) {
    return this.httpClient.post(`/users/${userId}/file-entries`, fileEntry);
  }

  /**
   * @returns {*}
   */
  searchFileEntries (params) {
    return this.httpClient.get('/users/file-entries', {
      params
    });
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

  /**
   * Lists all excuses which have not been acknowledged by leadership.
   *
   * @returns {*}
   */
  listUnacknowledgedExcuses () {
    return this.httpClient.get(`/users/excuses/unacknowledged`);
  }

  /**
   * Lists all of a user's excuses.
   *
   * @param {string} userId - Titan user ID.
   * @returns {*}
   */
  listUserEventExcuses (userId) {
    return this.httpClient.get(`/users/${userId}/excuses`);
  }

  /**
   * Save event excuse.
   *
   * @param {number} userId - Titan user id.
   * @param {{event_date, event_type, comments}} excuse
   * @returns {Promise}
   */
  saveUserEventExcuse (userId, excuse) {
    return this.httpClient.post(`/users/${userId}/excuses`, excuse);
  }

  /**
   * Acknowledges an excuse.
   *
   * The acknowledgement will be associated with the current
   * authenticated user.
   *
   * @param excuseId
   * @returns {Promise}
   */
  acknowledgeEventExcuse (excuseId) {
    return this.httpClient.post(`/users/excuses/${excuseId}/ack`);
  }
}

export default UsersService;
