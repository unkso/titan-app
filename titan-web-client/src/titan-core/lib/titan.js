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
 * @returns {[{route, layout, scene}]}
 */
export function collectRoutes (modules) {
  let routes = []
  let visitedRoutes = {}
  modules.forEach((module) => {
    if (module.routes) {
      Object.keys(module.routes).forEach((routeKey) => {
        if (!visitedRoutes.hasOwnProperty(routeKey)) {
          routes.push(module.routes[routeKey])
          visitedRoutes[routeKey] = true
        }
      })
    }
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
