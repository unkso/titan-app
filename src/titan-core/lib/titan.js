import DefaultThemeProvider from '../DefaultThemeProvider'

/**
 * @param {{modules}} applicationProvider
 */
export function mountApplicationRoutes (applicationProvider) {

}

/**
 * @param themeProvider
 */
export function resolveTheme (themeProvider) {
  return Object.assign({}, DefaultThemeProvider, themeProvider)
}
