import React from 'react';
import styled from 'styled-components';
import {Avatar, IconButton, useTheme} from "@material-ui/core";
import {UserProfile} from "@titan/http/api";
import {Palette} from "@titan/themes/default";

interface PageToolbarProps {
    userProfile: UserProfile;
}

const StyledToolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${props => props.padding}px 0;
`;

const StyledNotificationIconButton = styled(IconButton)`
  margin-right: ${props => props.padding}px;
`;

const StyledProfile = styled.div`
  align-items: center;
  display: flex;
  
  .gamer-tag {
    margin-left: ${props => props.padding}px;
  }
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${props => props.background};
  color: ${props => props.color};
`;

export function PageToolbar(props: PageToolbarProps) {
    const theme = useTheme();

    return (
        <StyledToolbar padding={theme.spacing(4)}>
            <StyledNotificationIconButton padding={theme.spacing(1)}>
                <i className="fal fa-bell" />
            </StyledNotificationIconButton>

            <StyledProfile padding={theme.spacing(1)}>
                <StyledAvatar
                    color={theme.palette.grey[900]}
                    background={theme.palette.primary.light}>AC</StyledAvatar>
                <span className="gamer-tag">{props.userProfile.username}</span>
            </StyledProfile>
        </StyledToolbar>
    );
}
