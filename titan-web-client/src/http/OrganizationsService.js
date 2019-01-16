import AuthenticatedService from 'titan/http/AuthenticatedService';

class OrganizationsService {
  constructor () {
    this.httpService = new AuthenticatedService();
    this.httpClient = this.httpService.getHttpClient();
  }

  /**
   * Finds an organization with the given slug.
   *
   * @param type - The group type of the parent most organization.
   * @param {string} path - A '/' delimited list of organization slugs (url
   * friendly names). Each subsequent element represents represents a
   * parent/child relationship with the previous element. For example:
   *
   * path = 'division/navy/alpha'
   *
   * The above will translate to: "query a squad named 'alpha', from the 'navy'
   * division".
   *
   * @returns {Promise}
   */
  findByPath (type, path = '') {
    return this.httpClient.get(`/organizations/${type}/${path}`);
  }

  /**
   * Lists the users belonging to an organization.
   *
   * @param organizationId
   * @returns {*}
   */
  findUsers (organizationId) {
    return this.httpClient.get(`/organizations/${organizationId}/users`);
  }
}

export default OrganizationsService;
