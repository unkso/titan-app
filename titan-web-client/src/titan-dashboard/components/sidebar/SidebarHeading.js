import React from 'react'
import styled from 'styled-components'

export const SidebarHeadingWrapper = styled.div`
  color: #fff;
  background-color: #191919;
  padding: 15px;
`

class SidebarHeading extends React.Component {
  render () {
    return (
      <SidebarHeadingWrapper>{this.props.children}</SidebarHeadingWrapper>
    )
  }
}

export default SidebarHeading
