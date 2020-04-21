import React, {ReactNode, useEffect, useState} from 'react';
import {Avatar, Tooltip, useTheme} from "@material-ui/core";
import styled from 'styled-components';

export interface ContextSidebarItemProps {
    hasNotification?: boolean;
    name: string;
    icon?: ReactNode;
    path: string;
}

const StyledAvatar = styled(Avatar)`
  background-color: ${props => props.background};
  color: ${props => props.color};
  font-size: x-large;
  height: ${props => props.dimensions}px;
  margin: inherit ${props => props.margin}px;
  text-transform: uppercase;
  transition: ${props => props.transition};
  width: ${props => props.dimensions}px;
`;

const StyledAvatarLink = styled.a`
  display: block;
  margin: 0 ${props => props.margin};
  text-decoration: none;
`;

const StyledNotificationIndicator = styled.div`
  border-radius: 0 4px 4px 0;
  background-color: ${props => props.visible ? '#5f6980' : 'transparent'};
  height: ${props => props.height}px;
  left: 0;
  position: absolute;
  transition: ${props => props.transition};
  width: 4px;
`;

const StyledContextSidebarItem = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  margin: 8px 0;

  &:hover {
    ${StyledAvatar} {
      border-radius: 35%;
    }
    
    ${StyledNotificationIndicator} {
      height: 24px;
    }
  }
`;

export function ContextSidebarItem(props: ContextSidebarItemProps) {
    const theme = useTheme();
    const [transition, setTransition] = useState();
    const [abbr, setAbbr] = useState('');
    useEffect(() => {
        // Get the first letter of the first two words in the
        // organization name.
        const letters = props.name.split(' ', 1)
            .map(word => word[0])
            .join();
        setAbbr(letters);
        setTransition(theme.transitions.create(['border-radius', 'height'], {
            duration: theme.transitions.duration.standard,
        }));
    }, [props.name]);

    return (
        <Tooltip title={props.name} placement="right" arrow>
            <StyledContextSidebarItem>
                <StyledNotificationIndicator
                    height={theme.spacing(1)}
                    visible={props.hasNotification}
                    transition={transition}
                />
                <StyledAvatarLink href={props.path}>
                    <StyledAvatar
                        color={theme.palette.text.secondary}
                        background={theme.palette.background.default}
                        dimensions={theme.spacing(7)}
                        margin={theme.spacing(1)}
                        transition={transition}>
                        {props.icon || abbr}
                    </StyledAvatar>
                </StyledAvatarLink>
            </StyledContextSidebarItem>
        </Tooltip>
    );
}
