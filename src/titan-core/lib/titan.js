import defaultThemeProvider from '../defaultThemeProvider'
import defaultApplicationProvider from '../defaultApplicationProvider'

/**
 * Collects all the routes from titan's core modules, and any
 * other modules listed as dependencies by the application
 * provider.
 *
 * @param {{name, dependencies, routes}} applicationProvider
 * @returns {[{route, layout, scene}]}
 */
export function collectApplicationRoutes (applicationProvider) {
  const modules = collectModules([
    applicationProvider,
    defaultApplicationProvider
  ])

  let routesMap = []
  modules.forEach((module) => {
    if (module.routes) {
      Object.keys(module.routes).forEach((routeKey) => {
        routesMap.push(module.routes[routeKey])
      })
    }
  })

  return routesMap
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
    const exists = visitedModules.every((m) => {
      return m.name === module.name
    }, false)

    if (visitedModules.length === 0 || !exists) {
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
