import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

/**
 * Conditionally renders children if all the given ACL permissions
 * are present in the current user's session.
 */
class WithAcl extends React.Component {
  hasAclPermissions(options) {
    return options.every((optionKey) => {
      return this.props.auth.session.acl.hasOwnProperty(optionKey);
    });
  }

  render() {
    if (this.hasAclPermissions(this.props.options)) {
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
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(WithAcl);
