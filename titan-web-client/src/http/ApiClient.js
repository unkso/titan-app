import { useEffect, useState } from 'react';
import AuthenticatedService from 'titan/http/AuthenticatedService';
import UnauthenticatedService from 'titan/http/UnauthenticatedService';

/**
 * Adds a user to an organization.
 *
 * @param {{orgId: number, userId: number}} fields
 * @returns {{auth: boolean, config: {method: string, data: {userId}, url: string}}}
 */
export function AddUserToOrganizationRequest (fields = {}) {
  const { orgId, userId } = fields;
  return {
    auth: true,
    config: {
      url: `/organizations/${orgId}/users`,
      method: 'post',
      data: { userId }
    }
  };
}

/**
 * Removes a user from an organization.
 *
 * @param {{orgId: number, userId: number}} fields
 * @returns {{auth: boolean, config: {method: string, data: {userId}, url: string}}}
 */
export function RemoveUserFromOrganizationRequest (fields = {}) {
  const { orgId, userId } = fields;
  return {
    auth: true,
    config: {
      url: `/organizations/${orgId}/users`,
      method: 'delete',
      data: { userId }
    }
  };
}

/**
 * Lists all users.
 *
 * @param {{limit: number, username: string}} fields
 * @returns {{
 *  auth: boolean,
 *  config: {method: string, params: {limit, username}, url: string}
 * }}
 */
export function ListUsersRequest (fields = {}) {
  const { username, limit } = fields;
  return {
    auth: false,
    config: {
      url: '/users',
      params: { username, limit },
      method: 'get'
    }
  };
}

export function ListOrganizationUsersRequest (fields = {}) {
  const { org_id } = fields;
  return {
    auth: false,
    config: {
      url: `/organizations/${org_id}/users`,
      method: 'get'
    }
  };
}

/**
 * React hook for sending requests to Titan's API services.
 *
 * @param {Function<{
 *  auth: boolean,
 *  config: AxiosRequestConfig
 * }>} reqFactory
 * @param {{}} fields - The fields required by the API endpoint to
 *  handle the request. If any of these values change, the request
 *  will be sent again.
 * @param {{onComplete: Function}} options - Additional settings to
 *  configure how to handle requests/responses.
 */
export function useTitanApiClient (reqFactory, fields = {}, options = {}) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [callCount, setCallCount] = useState(0);

  function complete (data, err) {
    setData(data);
    setError(err);
    setLoading(false);

    if (options.onComplete) {
      options.onComplete(data, err);
    }
  }

  function reload () {
    setCallCount(callCount + 1);
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await makeTitanApiRequest(reqFactory, fields);
        complete(res.data);
      } catch (err) {
        complete(undefined, err);
      }
    })();
  }, [...Object.values(fields), callCount]);

  return { data, error, loading, reload };
}

/**
 * Sends requests to Titan's API services.
 *
 * @param {Function<{
 *  auth: boolean,
 *  config: AxiosRequestConfig
 * }>} reqFactory
 * @param {{}} fields - The fields required by the API endpoint to
 *  handle the request. If any of these values change, the request
 *  will be sent again.
 * @returns {Promise<{}>}
 */
export function makeTitanApiRequest (reqFactory, fields = []) {
  const request = reqFactory(fields);

  // Empty querystring params should not be sent to the server.
  if (request.config.params) {
    request.config.params = removeEmptyValues(request.config.params);
  }

  return getClient(request).request(request.config);
}

/**
 * @param {{auth: boolean}} request
 * @returns {AxiosInstance}
 */
function getClient (request) {
  return request.auth
    ? (new AuthenticatedService()).httpClient
    : (new UnauthenticatedService()).httpClient;
}

/**
 * Removes fields from an object, where their values evaluate to
 * false (i.e undefined, null, empty string, etc.).
 *
 * @param {{}} obj
 * @returns {{}}
 */
function removeEmptyValues (obj) {
  for (const field of Object.keys(obj)) {
    if (!obj[field]) {
      delete obj[field];
    }
  }
  return obj;
}
