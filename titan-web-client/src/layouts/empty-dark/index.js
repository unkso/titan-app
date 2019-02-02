import styled, { createGlobalStyle, withTheme } from 'styled-components';
import React from 'react';

const EmptyDarkLayoutStyle = styled.div`
  background-color: ${props => props.theme.palette.backgroundInversePrimary};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const GlobalStyles = createGlobalStyle`
  html, body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
`;

class EmptyDarkLayout extends React.Component {
  render () {
    return (
      <React.Fragment>
        <GlobalStyles />
        <EmptyDarkLayoutStyle>{this.props.children}</EmptyDarkLayoutStyle>
      </React.Fragment>
    );
  }
}

export default withTheme(EmptyDarkLayout);
