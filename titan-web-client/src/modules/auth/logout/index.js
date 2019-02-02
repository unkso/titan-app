import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as authActions from 'titan/actions/authActions';
import connect from 'react-redux/es/connect/connect';
import WithCookies from 'titan/components/core/WithCookies';
import WithConfig from 'titan/components/core/WithConfig';

class LogoutScene extends React.Component {
  componentDidMount () {
    this.props.cookies.remove('wcf21_password', {
      path: '/',
      domain: this.props.config.get('woltlab.cookie.domain')
    });
    this.props.cookies.remove('wcf21_userID', {
      path: '/',
      domain: this.props.config.get('woltlab.cookie.domain')
    });
    this.props.cookies.remove('wcf21_cookieHash', {
      path: '/',
      domain: this.props.config.get('woltlab.cookie.domain')
    });
    this.props.actions.auth.logout();
    window.location = '/auth/login';
  }

  render () {
    return null;
  }
}

LogoutScene.propTypes = {
  actions: PropTypes.object,
  auth: PropTypes.object,
  cookies: PropTypes.object
};

function mapStateToProps (state) {
  return {
    auth: state.auth
  };
}

function mapActionsToProps (dispatch) {
  return {
    actions: {
      auth: bindActionCreators(authActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapActionsToProps)(
  WithConfig(WithCookies(LogoutScene))
);
