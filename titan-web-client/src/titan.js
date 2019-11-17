import boot from 'titan/boot';

/**
 * @param routes
 * @param store
 * @returns {{
 *    getStore,
 * }}
 * @constructor
 */
export const TitanContext = function ({ routes, store }) {
  this.routes = routes;
  this.store = store;
};

TitanContext.prototype.getStore = function () {
  return this.store;
};

TitanContext.prototype.getRoutes = function () {
  return this.routes;
};

let app = null;

/**
 * @returns {{
 *    getStore,
 * }}
 */
export function getAppContext () {
  if (!app) {
    app = new TitanContext(boot());
  }

  return app;
}
