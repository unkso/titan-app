import React, {useEffect, useState} from 'react';
import {Avatar, useTheme} from "@material-ui/core";
import styled from 'styled-components';

export interface ContextSidebarItemProps {
    name: string;
    path: string;
    hasNotification?: boolean;
}

const StyledAvatar = styled(Avatar)`
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
  background-color: ${props => props.visible ? '#fff' : 'transparent'};
  height: ${props => props.height}px;
  position: absolute;
  left: 0;
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
  }
`;

export function ContextSidebarItem(props: ContextSidebarItemProps) {
    const theme = useTheme();
    const [abbr, setAbbr] = useState('');
    useEffect(() => {
        // Get the first letter of the first two words in the
        // organization name.
        const letters = props.name.split(' ', 1)
            .map(word => word[0])
            .join();
        setAbbr(letters);
    }, [props.name]);

    return (
        <StyledContextSidebarItem>
            <StyledNotificationIndicator
                height={theme.spacing(1)}
                visible={props.hasNotification}
            />
            <StyledAvatarLink href={props.path}>
                <StyledAvatar
                    dimensions={theme.spacing(7)}
                    margin={theme.spacing(1)}
                    transition={theme.transitions.create('border-radius', {
                        duration: theme.transitions.duration.standard,
                    })}>{abbr}</StyledAvatar>
            </StyledAvatarLink>
        </StyledContextSidebarItem>
    );
}
