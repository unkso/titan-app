import styled, { createGlobalStyle } from 'styled-components';
import {useTheme} from '@material-ui/core/styles';
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

export function EmptyLayout(props) {
    const theme = useTheme();
    return (
        <React.Fragment>
            <GlobalStyles />
            <EmptyDarkLayoutStyle
                bgColor="#f60">{props.children}</EmptyDarkLayoutStyle>
        </React.Fragment>
    )
}
