import React from 'react'
import PropTypes from 'prop-types'
import { mountApplication, resolveTheme, resolveConfig } from '../lib/titan'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LayoutRenderer from './LayoutRenderer'
import TitanConfig from './../config'
import defaultConfig from '../config.default.json'

class TitanApp extends React.Component {
  constructor (props) {
    super(props)
    this.app = mountApplication(this.props.app)
    this.theme = resolveTheme(this.props.theme)
    TitanConfig.load(resolveConfig(defaultConfig, this.props.config))
  }

  renderRoute (route) {
    return () => (
      <LayoutRenderer
        layout={this.app.layouts[route.layout]}
        scene={route.scene}
      />
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
  theme: PropTypes.object,
  config: PropTypes.object
}

TitanApp.defaultProps = {
  app: {},
  theme: {},
  config: {}
}

export default TitanApp
