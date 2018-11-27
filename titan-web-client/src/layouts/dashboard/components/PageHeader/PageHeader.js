import React from 'react';
import styled from 'styled-components';

export const PageHeaderStyle = styled.header`
  background: #fff;
  padding: 16px 24px;
  border-bottom: 1px solid #ddd;
`;

class PageHeader extends React.Component {
  render () {
    return (
      <PageHeaderStyle>{this.props.children}</PageHeaderStyle>
    );
  }
}

export default PageHeader;
