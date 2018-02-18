import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import Sidebar from '../components/sidebar/Sidebar'
import WithTheme from 'titan-core/components/WithTheme'

export const DashboardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

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
`

export const ContentWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  display: flex;
  flex-direction: column;
  flex: 1;
`

injectGlobal`
  html, body {
    height: 100%;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
  
  body > #root {
    height: 100%;
    display: flex;
  }
`

class DashboardLayout extends React.Component {
  render () {
    const sidebarBg = this.props.titanTheme.palette.backgroundInversePrimary
    const contentBg = this.props.titanTheme.palette.backgroundPrimary
    return (
      <DashboardWrapper>
        <SidebarWrapper backgroundColor={sidebarBg}>
          <Sidebar />
        </SidebarWrapper>
        <ContentWrapper backgroundColor={contentBg}>
          {this.props.children}
        </ContentWrapper>
      </DashboardWrapper>
    )
  }
}

export default WithTheme(DashboardLayout)
