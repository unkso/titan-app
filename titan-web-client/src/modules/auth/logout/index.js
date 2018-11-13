import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as authActions from 'titan/actions/authActions';
import connect from 'react-redux/es/connect/connect';
import WithCookies from 'titan/components/core/WithCookies';

class LogoutScene extends React.Component {
  componentDidMount () {
    this.props.cookies.remove('wcf21_password_token', { path: '/' });
    this.props.cookies.remove('wcf21_userID', { path: '/' });
    this.props.actions.auth.logout();
  }

  render () {
    if (!this.props.auth.session) {
      window.location = '/auth/login';
    }

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
  WithCookies(LogoutScene)
);
