import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const SidebarHeadingWrapper = styled.div`
  color: #fff;
  border-top: 2px solid #191919;
  padding: 10px 15px;
`;

class SidebarHeading extends React.Component {
  render () {
    return (
      <SidebarHeadingWrapper>{this.props.children}</SidebarHeadingWrapper>
    );
  }
}

SidebarHeading.propTypes = {
  children: PropTypes.object
};

export default SidebarHeading;
