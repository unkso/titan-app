import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

/**
 * Conditionally renders children if all the given ACL permissions
 * are present in the current user's session.
 */
class WithAcl extends React.Component {
  canAccess () {
    if (this.props.authUserOptions) {
      if (this.props.authUserOptions.mustHaveOptions) {
        return this.isAuthenticatedUser(this.props.authUserOptions.userId) &&
            this.hasAclPermissions(this.props.options);
      }

      return this.isAuthenticatedUser(this.props.authUserOptions.userId) ||
          this.hasAclPermissions(this.props.options);
    }

    return this.hasAclPermissions(this.props.options);
  }

  isAuthenticatedUser (userId) {
    return userId === this.props.auth.session.user.id;
  }

  hasAclPermissions (options) {
    return options.every((optionKey) => {
      return this.props.auth.session.acl.hasOwnProperty(optionKey);
    });
  }

  render () {
    if (this.canAccess()) {
      return (
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      );
    }

    return null;
  }
}

WithAcl.propTypes = {
  // If specified, the authenticated user must have the given user Id and/or
  // all the specified ACL options.
  authUserOptions: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    mustHaveOptions: PropTypes.bool.isRequired
  }),

  // A list of ACL options.
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};

WithAcl.defaultProps = {
  authUserOptions: null
};

function mapStateToProps (state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(WithAcl);
