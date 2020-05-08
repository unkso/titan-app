import React from 'react';
import styled from 'styled-components';
import {
    Organization,
    UserProfile
} from "@titan/http/api";
import {
    InlineBadge,
    StyledInlineBadge
} from "@titan/components/inline_badge";
import {
    Avatar,
    Card,
    ListItem, ListItemAvatar,
    ListItemText, useTheme
} from "@material-ui/core";
import {RouteLink} from "@titan/components/routes";
import {
    ActivityIndicator,
    StyledActivityIndicator, StyledActivityIndicatorDot
} from "@titan/components/activity/activity_indicator";

export interface MemberListRowProps {
    organizations?: Organization[];
    user: UserProfile;
}

const StyledMemberListRow = styled.div`
  ${StyledInlineBadge} + ${StyledInlineBadge} {
    margin-left: 4px;
  }
  
  
  .avatar-wrapper {
    position: relative;

    ${StyledActivityIndicator} {
        bottom: -2px;
        position: absolute;
        right: 8px;
        
        ${StyledActivityIndicatorDot} {
          border: 2px solid ${props => props.indicatorBorderColor};
        }
      }
  }
`;

export function MemberListRow(props: MemberListRowProps) {
    const theme = useTheme();
    return (
        <StyledMemberListRow indicatorBorderColor={theme.palette.background.paper}>
            <RouteLink to={`/dashboard/members/${props.user.id}`}>
                <Card elevation={0}>
                    <ListItem component="div">
                        <ListItemAvatar>
                            <div className="avatar-wrapper">
                                <Avatar src={props.user.wcf.avatarUrl} />
                                <ActivityIndicator
                                    timestamp={props.user.wcf.lastActivityTime}
                                    variant="indicator"
                                />
                            </div>
                        </ListItemAvatar>
                        <ListItemText>
                            <div>
                                <span>{props.user.username}</span>
                                {props.user.loa && <InlineBadge type="info">LOA</InlineBadge>}
                                {props.user.a15 && <InlineBadge type="error">A-15</InlineBadge>}
                            </div>
                            <div>
                                {(props.organizations || []).map(org => (
                                    <InlineBadge type="neutral">{org.name}</InlineBadge>
                                ))}
                            </div>
                        </ListItemText>
                    </ListItem>
                </Card>
            </RouteLink>
        </StyledMemberListRow>
    );
}
