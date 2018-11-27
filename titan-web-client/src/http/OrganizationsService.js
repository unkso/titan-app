import AuthenticatedService from 'titan/http/AuthenticatedService';

class OrganizationsService {
  constructor () {
    this.httpService = new AuthenticatedService();
    this.httpClient = this.httpService.getHttpClient();
  }

  /**
   * Finds an organizations with the given slug.
   *
   * @param {string} slug - The url friendly name of an organization.
   * @returns {Promise}
   */
  findBySlug (slug) {
    return this.httpClient.get(`/organizations/${slug}`);
  }
}

export default OrganizationsService;
