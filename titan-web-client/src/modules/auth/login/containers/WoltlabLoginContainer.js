import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import WithConfig from 'titan/components/core/WithConfig';
import WithCookies from 'titan/components/core/WithCookies';
import WoltlabLoginForm from './../components/WoltlabLoginForm';
import AuthService from 'titan/http/AuthService';
import { bindActionCreators } from 'redux';
import * as authActions from 'titan/actions/authActions';

class WoltlabLoginContainer extends React.Component {
  constructor (props) {
    super(props);

    this.authService = new AuthService();
    this.state = {
      loading: true
    };
  }

  componentDidMount () {
    if (this.props.session) {
      window.location = '/branches';
      return;
    }

    const token = this.props.cookies.get('wcf21_password', {
      domain: this.props.config.get('woltlab.cookie.domain')
    });
    const userId = this.props.cookies.get('wcf21_userID', {
      domain: this.props.config.get('woltlab.cookie.domain')
    });

    if (token && userId) {
      this.authService.login(parseInt(userId, 10), token)
        .then((res) => {
          this.props.actions.auth.login(res.data);
          window.location = '/dashboard';
        })
        .catch(() => {
          // TODO Update UI to indicate error state. This will silently hide
          // errors that occur after the request is received, making it
          // difficult to debug.
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render () {
    return (
      <WoltlabLoginForm
        loading={this.state.loading}
        loginLink={this.props.config.get('woltlab.authUrl')}
      />
    );
  }
}

WoltlabLoginContainer.propTypes = {
  actions: PropTypes.object,
  config: PropTypes.object,
  cookies: PropTypes.object,
  session: PropTypes.object
};

function mapStateToProps (state) {
  return {
    session: state.auth.session
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
  WithConfig(WithCookies(WoltlabLoginContainer))
);
