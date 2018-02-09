import defaultThemeProvider from '../defaultThemeProvider'

/**
 * @param {{modules}} applicationProvider
 */
export function mountApplicationRoutes (applicationProvider) {

}

/**
 * @param themeProvider
 */
export function resolveTheme (themeProvider) {
  return Object.assign({}, defaultThemeProvider, themeProvider)
}
