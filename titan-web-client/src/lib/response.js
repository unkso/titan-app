/**
 * Returns the appropriate message for an error.
 *
 * @param {{response:{data: {code, description, message}}}} error
 * @param {string} defaultMessage
 * @returns {string}
 */
export function getUserMessageFromError (error, defaultMessage) {
  return error.response.data.message || defaultMessage;
}
