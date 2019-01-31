import boot from 'titan/boot';

/**
 * @param {{get, load}} config
 * @param cookies
 * @param routes
 * @param store
 * @returns {{
 *    getConfig,
 *    getStore,
 *    mergeConfigSettings
 * }}
 * @constructor
 */
export const TitanContext = function({ config, cookies, routes, store }) {
  this.routes = routes;
  this.store = store;
  this.config = config;
  this.cookies = cookies;
};

TitanContext.prototype.getConfig = function() {
  return this.config;
};

TitanContext.prototype.getCookies = function() {
  return this.cookies;
};

TitanContext.prototype.getStore = function() {
  return this.store;
};

TitanContext.prototype.getRoutes = function() {
  return this.routes;
};

TitanContext.prototype.mergeConfigSettings = function(configSettings) {
  this.config.load(Object.assign({}, this.config.get(), configSettings));
};

let app = null;

/**
 * @returns {{
 *    getConfig,
 *    getStore,
 *    mergeConfigSettings
 * }}
 */
export function getAppContext() {
  if (!app) {
    app = new TitanContext(boot());
  }

  return app;
}
