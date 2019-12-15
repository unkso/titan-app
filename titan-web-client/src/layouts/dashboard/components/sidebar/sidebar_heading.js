import React from 'react';
import styled from 'styled-components';

export const SidebarHeadingWrapper = styled.div`
  color: #fff;
  border-top: 2px solid #191919;
  padding: 10px 15px;
`;

class Sidebar_heading extends React.Component {
  render () {
    return (
      <SidebarHeadingWrapper>{this.props.children}</SidebarHeadingWrapper>
    );
  }
}

export default Sidebar_heading;
