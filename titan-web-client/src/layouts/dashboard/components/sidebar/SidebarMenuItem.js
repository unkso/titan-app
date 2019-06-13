import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export const SidebarMenuItemIcon = styled.div`
  width: 24px;
  text-align: center;
  color: ${props => props.color};
  display: flex;
  position: relative;
  top: 2px;
`;

export const SidebarMenuItemLabel = styled.div`
  color: ${props => props.textColor};
  margin: 0 10px;
  display: flex;
  flex: 1;
`;

export const SidebarMenuItemLink = styled(Link)`
  padding: 12px 15px 12px 25px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  border-left: 2px solid ${props => props.style.borderColor};
  
  &:hover {
    background-color: ${props => props.style.hoverBackground};
  }
`;

class SidebarMenuItemComponent extends React.Component {
  render () {
    let iconColor, textColor, borderColor;
    if (this.props.isActive) {
      iconColor = this.props.theme.palette.primary.main;
      textColor = this.props.theme.palette.secondary.text;
      borderColor = this.props.theme.palette.primary.main;
    } else {
      iconColor = this.props.theme.palette.inverseTextPrimary;
      textColor = this.props.theme.palette.inverseTextPrimary;
      borderColor = 'transparent';
    }

    return (
      <SidebarMenuItemLink
        to={this.props.url}
        style={{
          borderColor,
          hoverBackground: this.props.theme.palette.backgroundInverseSecondary
        }}
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
    );
  }
}

SidebarMenuItemComponent.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
  theme: PropTypes.object,
  isActive: PropTypes.bool
};

SidebarMenuItemComponent.defaultProps = {
  isActive: false
};

export const SidebarMenuItem = withTheme(SidebarMenuItemComponent);
