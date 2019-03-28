import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import Sidebar from './components/sidebar/Sidebar';

export const DashboardWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const SidebarWrapper = styled.div`
  width: 280px;
  height: 100%;
  background-color: ${props => props.backgroundColor};
  display: flex;
  flex-direction: column;
  position: relative;
  -webkit-box-shadow: 8px 0 43px 3px rgba(0,0,0,0.25);
  -moz-box-shadow: 8px 0 43px 3px rgba(0,0,0,0.25);
  box-shadow: 8px 0 43px 3px rgba(0,0,0,0.25);
`;

export const ContentWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100vh;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
  
  body > #root {
    min-height: 100vh;
  
    #app-root {
      min-height: 100vh;
    }
  }
`;

class DashboardLayout extends React.Component {
  render () {
    const sidebarBg = this.props.theme.palette.backgroundInversePrimary;
    const contentBg = this.props.theme.palette.backgroundPrimary;
    return (
      <DashboardWrapper>
        <GlobalStyles />
        <SidebarWrapper backgroundColor={sidebarBg}>
          <Sidebar />
        </SidebarWrapper>
        <ContentWrapper backgroundColor={contentBg}>
          {this.props.children}
        </ContentWrapper>
      </DashboardWrapper>
    );
  }
}

DashboardLayout.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.object
};

export default withTheme(DashboardLayout);
