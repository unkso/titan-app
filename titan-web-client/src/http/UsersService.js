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
