import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AuthenticatedRoute extends React.Component {
  componentDidMount() {
    if (!this.props.auth.session) {
      window.location = '/auth/login';
    }
  }

  render() {
    // React may attempt to render the scene before the auth
    // redirect. This will trigger errors if the scene contains
    // components that require the user's session information.
    // Therefore, if the user is not signed in, prevent the
    // view from being rendered.
    if (!this.props.auth.session) {
      return null;
    }

    return this.props.children;
  }
}

AuthenticatedRoute.propTypes = {
  auth: PropTypes.object,
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(AuthenticatedRoute);
