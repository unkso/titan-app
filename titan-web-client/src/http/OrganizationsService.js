import qs from 'query-string';
import AuthenticatedService from '@titan/http/AuthenticatedService';

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

  /**
   * Finds the parent of the given role, where the parent role is
   * assigned to another user.
   */
  findParentRole (roleId) {
    return this.httpClient.get(`/organizations/roles/${roleId}/parent`);
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

  /**
   * Save an organization report.
   */
  saveReport (organizationId, report) {
    return this.httpClient.post(
      `/organizations/${organizationId}/reports`, report);
  }

  /**
   * Lists all the unacknowledged reports visible to the authenticated
   * user.
   */
  findUnacknowledgedReports () {
    return this.httpClient.get(`/organizations/reports/unacknowledged`);
  }

  /**
   * Acknowledges a report.
   *
   * The acknowledgement will be associated with the current
   * authenticated user.
   */
  acknowledgeReport (orgId, reportId) {
    return this.httpClient.post(`/organizations/${orgId}/reports/${reportId}/ack`);
  }

  /**
   * List file entries owned by one of the given organizations.
   *
   * @parm {string} params.organizations
   * @param {string} params.from_start_date
   * @param {string} params.to_start_date
   */
  findFileEntries (params) {
    return this.httpClient.get('/organizations/file-entries', { params });
  }
}

export default OrganizationsService;
