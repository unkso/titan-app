import React from 'react'
import { mountApplication, resolveConfig, resolveTheme } from './lib/titan'
import TitanApp from './components/TitanApp'
import { createStateReducer } from './lib/redux/stateReducer'
import { createStore } from 'redux'
import TitanConfig from './config'
import defaultConfig from './config.default.json'

class Titan {
  constructor () {
    this._config = new TitanConfig()
    this._modules = []
    this._store = null
    this._theme = {}
    this._layouts = {}
    this._routes = {}
  }

  setConfig (config = {}) {
    this._config.load(resolveConfig(defaultConfig, config))
  }

  setTheme (theme = {}) {
    this._theme = resolveTheme(theme)
  }

  useModules (modules = []) {
    modules.forEach((module) => {
      if (!this._modules.includes(module.name)) {
        this._modules.push(module)
      }
    })
  }

  mount () {
    const {layouts, routes, reducers} = mountApplication(this._modules)
    this._layouts = layouts
    this._routes = routes
    this._store = createStore(
      createStateReducer(reducers)
    )

    return (
      <TitanApp
        store={this._store}
        routes={this._routes}
        layouts={this._layouts}
      />
    )
  }

  getReduxState () {
    return (this._store) ? this._store.getState() : null
  }

  getTheme () {
    return this._theme
  }

  getEnvironment () {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return 'development'
    }

    return process.env.NODE_ENV
  }
}

let app = null

/**
 * @returns {Titan}
 */
export function getTitanInstance () {
  if (!app) {
    app = new Titan()
  }

  return app
}
