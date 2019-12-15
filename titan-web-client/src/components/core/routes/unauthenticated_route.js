import React from 'react';
import PropTypes from 'prop-types';

class Unauthenticated_route extends React.Component {
  render () {
    return this.props.children;
  }
}

Unauthenticated_route.propTypes = {
  children: PropTypes.object
};

export default Unauthenticated_route;
