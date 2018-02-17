import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LayoutRenderer from './LayoutRenderer'
import { Provider } from 'react-redux'

class TitanApp extends React.Component {
  renderRoute (route) {
    return () => (
      <LayoutRenderer
        layout={this.props.layouts[route.layout]}
        scenes={route.scenes}
      />
    )
  }

  renderRoutes (routes) {
    let routeComponents = []
    Object.keys(routes).forEach((path, key) => {
      routeComponents.push(
        <Route
          key={key}
          path={path}
          component={this.renderRoute(routes[path])}
        />
      )
    })

    return routeComponents
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <Switch>
            {this.renderRoutes(this.props.routes)}
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

TitanApp.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  layouts: PropTypes.object.isRequired
}

export default TitanApp
