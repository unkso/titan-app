import { useEffect, useState } from 'react';
import AuthenticatedService from 'titan/http/AuthenticatedService';
import UnauthenticatedService from 'titan/http/UnauthenticatedService';

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
 * Sends requests to Titan's API services.
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

  /**
   * @param {{auth: boolean}} request
   * @returns {AxiosInstance}
   */
  function getClient (request) {
    return request.auth
      ? (new AuthenticatedService()).httpClient
      : (new UnauthenticatedService()).httpClient;
  }

  function complete (data, err) {
    setData(data);
    setError(err);
    setLoading(false);

    if (options.onComplete) {
      options.onComplete(data, err);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const request = reqFactory(fields);
        if (request.config.params) {
          // Empty querystring parms should not be sent to the server.
          request.config.params =
            removeEmptyValues(request.config.params);
        }
        const res = await getClient(request).request(request.config);
        complete(res.data);
      } catch (err) {
        complete(undefined, err);
      }
    })();
  }, [...Object.values(fields)]);

  return { data, error, loading };
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
