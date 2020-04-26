import React, {ReactNode, useEffect, useState} from 'react';
import {Avatar, Tooltip, useTheme} from "@material-ui/core";
import styled from 'styled-components';
import {RouteLink} from "@titan/components/routes";

export interface ContextSidebarItemProps {
    hasNotification?: boolean;
    name: string;
    icon?: ReactNode;
    imageUrl?: string;
    path: string;
}

const StyledAvatar = styled(Avatar)`
  background-color: ${props => props.background};
  background-image: url(${props => props.image});
  background-size: cover;
  color: ${props => props.color};
  font-size: x-large;
  height: ${props => props.dimensions}px;
  margin: inherit ${props => props.margin}px;
  text-transform: uppercase;
  transition: ${props => props.transition};
  width: ${props => props.dimensions}px;
`;

const StyledAvatarLink = styled(RouteLink)`
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
    const [innerContent, setInnerContent] = useState();
    useEffect(() => {
        setTransition(theme.transitions.create(['border-radius', 'height'], {
            duration: theme.transitions.duration.standard,
        }));
    }, [theme.transitions]);

    useEffect(() => {
        if (props.imageUrl) {
            setInnerContent('');
        } else if (props.icon) {
            setInnerContent(props.icon);
        } else {
            // Get the first letter of the first two words in the
            // organization name.
            const abbr = props.name.split(' ', 1)
                .map(word => word[0])
                .join();
            setInnerContent(abbr);
        }
    }, [props.imageUrl, props.icon, props.name]);

    return (
        <Tooltip title={props.name} placement="right" arrow>
            <StyledContextSidebarItem>
                <StyledNotificationIndicator
                    height={theme.spacing(1)}
                    visible={props.hasNotification}
                    transition={transition}
                />
                <StyledAvatarLink to={props.path}>
                    <StyledAvatar
                        color={theme.palette.text.secondary}
                        background={theme.palette.background.default}
                        image={props.imageUrl}
                        dimensions={theme.spacing(7)}
                        margin={theme.spacing(1)}
                        transition={transition}>
                        {innerContent}
                    </StyledAvatar>
                </StyledAvatarLink>
            </StyledContextSidebarItem>
        </Tooltip>
    );
}
