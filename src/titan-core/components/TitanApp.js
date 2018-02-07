import React from 'react'
import PropTypes from 'prop-types'
import {
  mountApplication,
  resolveTheme
} from '../lib/titan'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class TitanApp extends React.Component {
  constructor (props) {
    super(props)
    this.app = mountApplication(this.props.app)
    this.theme = resolveTheme(this.props.theme)
  }

  renderRoute (route) {
    const Layout = route.layout

    return () => (
      <Layout />
    )
  }

  renderRoutes (routes) {
    let routeComponents = []
    routes.forEach((route, key) => {
      const isExact = route.exact ? route.exact : true
      routeComponents.push(
        <Route
          key={key}
          path={route.path}
          exact={isExact}
          component={this.renderRoute(route)}
        />
      )
    })

    return routeComponents
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          {this.renderRoutes(this.app.routes)}
        </Switch>
      </BrowserRouter>
    )
  }
}

TitanApp.propTypes = {
  app: PropTypes.object,
  theme: PropTypes.object
}

TitanApp.defaultProps = {
  app: {},
  theme: {}
}

export default TitanApp
