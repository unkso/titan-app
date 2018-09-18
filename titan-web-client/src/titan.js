import boot from 'titan/boot'

/**
 * @param {{get, load}} config
 * @param routes
 * @param store
 * @returns {{
 *    getConfig,
 *    getStore,
 *    mergeConfigSettings
 * }}
 * @constructor
 */
export const TitanContext = function ({ config, routes, store }) {
  this.routes = routes
  this.store = store
  this.config = config
}

TitanContext.prototype.getConfig = function () {
  return this.config
}

TitanContext.prototype.getStore = function () {
  return this.store
}

TitanContext.prototype.getRoutes = function () {
  return this.routes
}

TitanContext.prototype.mergeConfigSettings = function (configSettings) {
  this.config.load(Object.assign({}, this.config.get(), configSettings))
}

let app = null

/**
 * @returns {{
 *    getConfig,
 *    getStore,
 *    mergeConfigSettings
 * }}
 */
export function getAppContext () {
  if (!app) {
    app = new TitanContext(boot())
  }

  return app
}
