import styled, { createGlobalStyle } from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import React from 'react';

const EmptyDarkLayoutStyle = styled.div`
  background-color: ${props => props.bgColor};
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
        <EmptyDarkLayoutStyle
          bgColor={this.props.theme.palette.backgroundInversePrimary}>{this.props.children}</EmptyDarkLayoutStyle>
      </React.Fragment>
    );
  }
}

export default withTheme(EmptyDarkLayout);
