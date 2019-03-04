import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { createAclInstanceFromSession } from 'titan/lib/acl';

/**
 * Conditionally renders children if all the given ACL permissions
 * are present in the current user's session.
 */
class WithAclComponent extends React.Component {
  render () {
    const canAccess =
        createAclInstanceFromSession(this.props.auth.session)
          .canAccess(this.props.options, this.props.authUserOptions,
            this.props.mustHaveAllOptions);

    if (canAccess) {
      return (
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      );
    }

    return null;
  }
}

WithAclComponent.propTypes = {
  // If specified, the authenticated user must have the given user Id and/or
  // all the specified ACL options.
  authUserOptions: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    mustHaveOptions: PropTypes.bool.isRequired
  }),

  // A list of ACL options.
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  mustHaveAllOptions: PropTypes.bool
};

WithAclComponent.defaultProps = {
  authUserOptions: null,
  mustHaveAllOptions: false
};

function mapStateToProps (state) {
  return {
    auth: state.auth
  };
}

export const WithAcl = connect(mapStateToProps)(WithAclComponent);
