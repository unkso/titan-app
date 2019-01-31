import React from 'react';
import PropTypes from 'prop-types';

class UnauthenticatedRoute extends React.Component {
  render() {
    return this.props.children;
  }
}

UnauthenticatedRoute.propTypes = {
  children: PropTypes.object
};

export default UnauthenticatedRoute;
