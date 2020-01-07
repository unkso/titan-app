import { useEffect, useState } from 'react';
import AuthenticatedService from '@titan/http/AuthenticatedService';
import UnauthenticatedService from '@titan/http/UnauthenticatedService';

/**
 * Login a user with woltlab credentials.
 *
 * @param {number} fields.userId - A user's WoltLab user ID.
 * @param {string} fields.token - A user's password token.
 */
export function WoltlabLoginRequest (fields = {}) {
  return {
    auth: false,
    config: {
      url: '/auth/woltlab',
      method: 'post',
      data: {
        user_id: fields.userId,
        cookie_password: fields.token
      }
    }
  };
}

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
    auth: true,
    config: {
      url: '/users',
      params: { username, limit },
      method: 'get'
    }
  };
}

export const ROLE_SCOPES = {
  RANKED: 0,
  SUPPORT: 1,
  ALL: 2
};

/**
 * Lists an organization's roles.
 *
 * @param {{orgId: number, scope: string}} fields
 * @returns {{
 *  auth: boolean,
 *  config: {method: string, params: {limit, username}, url: string}
 * }}
 */
export function ListOrganizationRolesRequest (fields = {}) {
  let { orgId, scope } = fields;
  if (scope === undefined) {
    scope = ROLE_SCOPES.ALL;
  }

  return {
    auth: true,
    config: {
      url: `/organizations/${orgId}/roles`,
      method: 'get',
      params: { scope: String(scope) }
    }
  };
}

/**
 * Reorders an organization's roles.
 *
 * @param {{orgId: number, roleIds: Array<number>}} fields
 */
export function ReorderOrganizationRolesRequest (fields = {}) {
  return {
    auth: true,
    config: {
      url: `/organizations/${fields.orgId}/roles:reorder`,
      method: 'post',
      data: { roleIds: fields.roleIds }
    }
  };
}

/**
 * Lists all members in an organization.
 *
 * @param {{orgId: number}} fields
 * @returns {{auth: boolean, config: {method: string, url: string}}}
 */
export function ListOrganizationMembersRequest (fields = {}) {
  const { orgId } = fields;
  return {
    auth: true,
    config: {
      url: `/organizations/${orgId}/users`,
      method: 'get'
    }
  };
}

/**
 * Lists all of an organization's reports.
 *
 * @param {{orgId: number}} fields
 * @returns {{auth: boolean, config: {method: string, url: string}}}
 */
export function ListOrganizationReportsRequest (fields = {}) {
  const { orgId } = fields;
  return {
    auth: true,
    config: {
      url: `/organizations/${orgId}/reports`,
      method: 'get'
    }
  };
}

/**
 * Lists file entry types.
 */
export function ListFileEntryTypes () {
  return {
    auth: true,
    config: {
      url: `/users/file-entry-types`,
      method: 'get'
    }
  };
}

/**
 * Finds an organizations with the given slug.
 *
 * @param {string} fields.slug - The url friendly name of an organization.
 */
export function GetOrganizationBySlugRequest (fields) {
  return {
    auth: true,
    config: {
      url: `/organizations/${fields.slug}`,
      method: 'get'
    }
  };
}

/**
 * list an organization's chan of command.
 *
 * @param {number} fields.orgId
 */
export function ListOrganizationChildrenRequest (fields) {
  return {
    auth: true,
    config: {
      url: `/organizations/${fields.orgId}/children`,
      method: 'get'
    }
  };
}

/**
 * list an organization's chan of command.
 *
 * @param {number} fields.id
 */
export function ListOrganizationChainOfCommandRequest (fields) {
  return {
    auth: true,
    config: {
      url: `/organizations/${fields.id}/coc`,
      method: 'get'
    }
  };
}

/**
 * Login using woltlab credentials.
 *
 * @param {{userId: string, token: string}} fields
 * @returns {{auth: boolean, config: {method: string, url: string}}}
 */
export function AuthWoltlabLoginRequest (fields) {
  return {
    auth: false,
    config: {
      url: '/auth/woltlab',
      method: 'post',
      data: {
        cookie_password: fields.token,
        user_id: fields.userId
      }
    }
  };
}

/**
 * Create or update an organization role.
 *
 * @param {{id, orgId, user_id, role, rank }} fields
 */
export function SaveOrganizationRoleRequest (fields = {}) {
  const { id, orgId, ...others } = fields;

  if (id) {
    return {
      auth: true,
      config: {
        url: `/organizations/${orgId}/roles/${id}`,
        method: 'post',
        data: others
      }
    };
  }

  return {
    auth: true,
    config: {
      url: `/organizations/${orgId}/roles`,
      method: 'post',
      data: others
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
