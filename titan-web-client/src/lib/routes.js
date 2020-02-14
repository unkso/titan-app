/**
 * @param {string} path
 * @param {Array<string|number>} params
 */
export function routeBuilder (path, params = []) {
  let i = 0;
  const segments = path.split('/');

  const route = segments.map((segment, index) => {
    // If the segment is a placeholder, replace it with the a intended
    // value.
    if (segment[0] === ':') {
      if (i >= params.length) {
        throw new Error('Failed to build route. Path expects more ' +
          'params then were given.');
      }
      return params[i++];
    }
    return segment;
  });

  if (i < params.length) {
    throw new Error('Failed to build route. Path expects fewer ' +
      'params then were given.');
  }
  return route.join('/');
}
