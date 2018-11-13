/**
 * Creates a unique key for the structure of a route's path.
 *
 * Routes are uniquely identified by their "path" property. To determine
 * if a route is already in use, we cannot simply check if the exact path
 * has been registered in another route, because some routes contain
 * URL parameters that may differ in name, but have the same structure.
 *
 *    /profile/:userId
 *    /profile/:tabId
 *
 * The two URLs above only differ by the parameter name. This method will
 * replace the parameter names with a placeholder to expose the URL
 * structure, making it easier to identify duplicate routes.
 *
 *    /profile/{}
 *    /profile/{}
 *
 * @param path
 * @returns {*}
 */
const makeRouteKey = (path) => {
  return path.replace(/:[A-Z-a-z0-9]+/g, '{}');
};

/**
 * Adds a module's routes to a route map.
 *
 * Each route path must have a unique structure.
 *
 * @see makeRouteKey()
 *
 * @param routesMap
 * @param routes
 */
export const mountRoutes = (routesMap, routes) => {
  routes.forEach((route) => {
    const routeKey = makeRouteKey(route.path);

    if (routesMap.hasOwnProperty(routeKey)) {
      throw new Error(`Duplicate route pattern: ${routeKey}.`);
    }

    routesMap[routeKey] = route;
  });
};

/**
 * Adds a reducer to reducer map if the reducer name is unique.
 *
 * @param {object} reducersMap
 * @param {string} name
 * @param {object} reducer
 */
export const mountReducer = (reducersMap, name, reducer) => {
  if (reducersMap.hasOwnProperty(name)) {
    throw new Error(`Duplicate module name for reducer: ${name}.`);
  }

  reducersMap[name] = reducer;
};

/**
 * @param rootConfig
 * @param name
 * @param moduleConfig
 */
export const mountConfig = (rootConfig, name, moduleConfig) => {
  if (rootConfig.hasOwnProperty(name)) {
    throw new Error(`Duplicate module name for config: ${name}.`);
  }

  rootConfig[name] = moduleConfig;
};
