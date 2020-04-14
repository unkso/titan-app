import React from 'react';
import PropTypes from 'prop-types';
import useTheme from '@material-ui/core/styles/useTheme';
import styled from 'styled-components';
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

export const SidebarMenuItemInternal = styled(Link)``;

export const SidebarMenuItemLink = styled.div`
  ${SidebarMenuItemInternal},
  a {
    border-left: 2px solid ${props => props.style.borderColor};
    display: flex;
    flex-direction: row;
    padding: 12px 15px 12px 25px;
    text-decoration: none;
    
    &:hover {
      background-color: ${props => props.style.hoverBackground};
    }
  }
`;

export function SidebarMenuItem (props) {
  const theme = useTheme();
  let iconColor, textColor, borderColor;
  if (props.isActive) {
    iconColor = theme.palette.primary.main;
    textColor = theme.palette.secondary.text;
    borderColor = theme.palette.primary.main;
  } else {
    iconColor = theme.palette.inverseTextPrimary;
    textColor = theme.palette.inverseTextPrimary;
    borderColor = 'transparent';
  }

  const template = (
    <React.Fragment>
      <SidebarMenuItemIcon color={iconColor}>
        {props.leftIcon}
      </SidebarMenuItemIcon>
      <SidebarMenuItemLabel textColor={textColor}>
        {props.label}
      </SidebarMenuItemLabel>
      <SidebarMenuItemIcon color={iconColor}>
        {props.rightIcon}
      </SidebarMenuItemIcon>
    </React.Fragment>
  );
  const styles = {
    borderColor,
    hoverBackground: theme.palette.backgroundInverseSecondary
  };

  return (
    <SidebarMenuItemLink style={styles}>
      {props.isExternal ? (
        <a href={props.url}>{template}</a>
      ) : (
        <SidebarMenuItemInternal
          to={props.url}>{template}</SidebarMenuItemInternal>
      )}
    </SidebarMenuItemLink>
  );
}

SidebarMenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
  isActive: PropTypes.bool,
  isExternal: PropTypes.bool
};

SidebarMenuItem.defaultProps = {
  isActive: false,
  isExternal: false
};
