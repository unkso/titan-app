import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const SidebarContentGroupWrapper = styled.div`
  padding: 10px 0;
`;

class SidebarContentGroup extends React.Component {
  render() {
    return (
      <SidebarContentGroupWrapper>
        {this.props.children}
      </SidebarContentGroupWrapper>
    );
  }
}

SidebarContentGroup.propTypes = {
  children: PropTypes.any
};

export default SidebarContentGroup;
