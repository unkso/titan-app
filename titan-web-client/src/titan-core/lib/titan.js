import defaultThemeProvider from '../defaultThemeProvider'
import defaultApplicationProvider from '../defaultApplicationProvider'

export function mountApplication (applicationProvider) {
  const modules = collectModules([
    applicationProvider,
    defaultApplicationProvider
  ])

  return {
    layouts: collectLayouts(modules),
    routes: collectRoutes(modules)
  }
}

export function collectLayouts (modules) {
  return modules.reduce((layouts, module) => {
    if (module.hasOwnProperty('layouts')) {
      Object.keys(module.layouts).forEach((layoutKey) => {
        layouts[layoutKey] = module.layouts[layoutKey]
      })
    }

    return layouts
  }, {})
}

/**
 * Collects all the routes from titan's core modules, and any
 * other modules listed as dependencies by the application
 * provider.
 *
 * @param {[{name, dependencies, routes}]} modules
 * @returns {{}}
 */
export function collectRoutes (modules) {
  let routes = {}
  modules.forEach((module) => {
    if (module.routes) {
      module.routes.forEach((route) => {
        if (!routes.hasOwnProperty(route.path)) {
          routes[route.path] = {
            layout: route.layout,
            layoutPriority: 0,
            scenes: []
          }
        }

        // If the route has a higher layout priority, override the
        // currently selected layout.
        if (route.hasOwnProperty('layoutPriority') &&
            route.layoutPriority > routes[route.path].layoutPriority) {
          routes[route.path].layoutPriority = route.layoutPriority
          routes[route.path].layout = route.layout
        }

        routes[route.path].scenes.push({
          scene: route.scene,
          renderPriority: route.renderPriority || 0
        })
      })
    }
  })

  // Sort the route for each scene by renderPriority
  Object.keys(routes).forEach((path) => {
    routes[path].scenes.sort((a, b) => {
      if (a.renderPriority < b.renderPriority) {
        return 1
      } else if (b.renderPriority < a.renderPriority) {
        return -1
      }

      return 0
    })
  })

  return routes
}

/**
 * Lists all modules found in a dependency tree.
 *
 * @param {[{name, dependencies, routes}]} modules
 * @param {[{name, dependencies, routes}]} visitedModules
 * @returns {[{name, dependencies, routes}]}
 */
export function collectModules (modules, visitedModules = []) {
  modules.forEach((module) => {
    const isUnique = visitedModules.every((m) => {
      return m.name !== module.name
    })

    if (visitedModules.length === 0 || isUnique) {
      visitedModules.push(module)

      if (module.dependencies && module.dependencies.length > 0) {
        visitedModules = collectModules(module.dependencies, visitedModules)
      }
    }
  })

  return visitedModules
}

/**
 * @param themeProvider
 */
export function resolveTheme (themeProvider) {
  return Object.assign({}, defaultThemeProvider, themeProvider)
}

/**
 * Merges two configs.
 *
 * @param {{}} defaultConfig
 * @param {{}} otherConfig
 * @returns {{otherConfig: *}}
 */
export function resolveConfig (defaultConfig, otherConfig) {
  return Object.assign({}, defaultConfig, otherConfig)
}
