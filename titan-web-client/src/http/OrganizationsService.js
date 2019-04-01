import qs from 'query-string';
import AuthenticatedService from 'titan/http/AuthenticatedService';

class OrganizationsService {
  constructor () {
    this.httpService = new AuthenticatedService();
    this.httpClient = this.httpService.getHttpClient();
  }

  /**
   * Find all organizations that the server knows about.
   *
   * @returns {Promise}
   */
  findAll () {
    return this.httpClient.get(`/organizations`);
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

  /** List an organization's chan of command. */
  findChainOfCommand (id) {
    return this.httpClient.get(`/organizations/${id}/coc`);
  }

  /**
   * List an organization's leadership roles that do not affect the
   * chain of command.
   */
  findUnrankedRoles (id) {
    return this.httpClient.get(`/organizations/${id}/roles/unranked`);
  }

  /** List the non-leadership users of an organization. */
  findUsers (id) {
    return this.httpClient.get(`/organizations/${id}/users`);
  }

  /** List the child organizations of a parent organization. */
  findChildren (id) {
    return this.httpClient.get(`/organizations/${id}/children`);
  }

  /** List the child organizations of a parent organization. */
  findChildrenIds (id, recursive = false) {
    return this.httpClient.get(
      `/organizations/${id}/children`, qs.stringify({ recursive }));
  }

  /**
   * List an organization's reports. The result will only return
   * reports that the current authenticated user has permission to
   * access.
   */
  findReports (id) {
    return this.httpClient.get(`/organizations/${id}/reports`);
  }
}

export default OrganizationsService;
