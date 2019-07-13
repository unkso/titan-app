import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import defaultTheme from 'titan/themes/default';
import AuthenticatedRoute from './routes/AuthenticatedRoute';
import UnauthenticatedRoute from './routes/UnauthenticatedRoute';
import {
  ROUTE_TYPE_AUTHENTICATED,
  ROUTE_TYPE_UNAUTHENTICATED
} from 'titan/lib/routing';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import { MatPickerDateUtils } from 'titan/lib/matPickerDateUtils';

const defaultMuiTheme = createMuiTheme(defaultTheme);

class TitanApp extends React.Component {
  static getRouteComponent (route) {
    switch (route.type) {
      case ROUTE_TYPE_AUTHENTICATED:
        return AuthenticatedRoute;
      case ROUTE_TYPE_UNAUTHENTICATED:
        return UnauthenticatedRoute;
      default:
        return null;
    }
  }

  renderSceneInLayout (route, RouteComponent) {
    const Layout = route.layout;
    const Scene = route.scene;

    if (!Scene) {
      throw new Error(`Route ${route.path} does not have prop "scene".`);
    }

    let content;
    if (Layout) {
      content = (
        <Layout>
          <Scene context={this.props.context} />
        </Layout>
      );
    } else {
      content = (<Scene context={this.props.context} />);
    }

    if (RouteComponent) {
      return () => (
        <RouteComponent context={this.props.context}>
          {content}
        </RouteComponent>
      );
    }

    return () => (content);
  }

  renderRoutes (routes) {
    const routeComponents = [];

    Object.keys(routes).forEach((key) => {
      const RouteComponent = TitanApp.getRouteComponent(routes[key]);
      const Scene = this.renderSceneInLayout(routes[key], RouteComponent);
      const route = (
        <Route key={key} exact path={routes[key].path} component={Scene} />
      );

      routeComponents.push(route);
    });

    return routeComponents;
  }

  render () {
    return (
      <MuiThemeProvider theme={defaultMuiTheme}>
        <SnackbarProvider anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
          <MuiPickersUtilsProvider utils={MatPickerDateUtils}>
            <div id="app-root">
              <Provider store={this.props.context.getStore()}>
                <BrowserRouter>
                  <Switch>
                    {this.renderRoutes(this.props.context.getRoutes())}
                    <Redirect from="/" to="/organizations" />
                  </Switch>
                </BrowserRouter>
              </Provider>
            </div>
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

TitanApp.propTypes = {
  context: PropTypes.object.isRequired
};

export default TitanApp;
