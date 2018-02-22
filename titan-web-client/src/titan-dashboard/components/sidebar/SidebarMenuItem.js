import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import WithTheme from '../../../titan-core/components/WithTheme'

export const SidebarMenuItemIcon = styled.div`
  color: ${props => props.color};
  display: flex;
`

export const SidebarMenuItemLabel = styled.div`
  color: ${props => props.textColor};
  margin: 0 10px;
  display: flex;
  flex: 1;
`

export const SidebarMenuItemLink = styled(Link)`
  padding: 15px;
  text-decoration: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  
  &:hover {
    background-color: ${props => props.hoverBackground };
  }
`

class SidebarMenuItem extends React.Component {
  render () {
    let iconColor, textColor
    if (this.props.isActive) {
      iconColor = this.props.titanTheme.palette.primary
      textColor = this.props.titanTheme.palette.inverseTextSecondary
    } else {
      iconColor = this.props.titanTheme.palette.inverseTextPrimary
      textColor = this.props.titanTheme.palette.inverseTextPrimary
    }

    return (
      <SidebarMenuItemLink
        to={this.props.url}
        hoverBackground={this.props.titanTheme.palette.backgroundInverseSecondary}
      >
        <SidebarMenuItemIcon color={iconColor}>
          {this.props.leftIcon}
        </SidebarMenuItemIcon>
        <SidebarMenuItemLabel textColor={textColor}>
          {this.props.label}
        </SidebarMenuItemLabel>
        <SidebarMenuItemIcon color={iconColor}>
          {this.props.rightIcon}
        </SidebarMenuItemIcon>
      </SidebarMenuItemLink>
    )
  }
}

SidebarMenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
  titanTheme: PropTypes.object,
  isActive: PropTypes.bool
}

SidebarMenuItem.defaultProps = {
  isActive: false
}

export default WithTheme(SidebarMenuItem)
