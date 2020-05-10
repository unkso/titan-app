import React from 'react';
import styled from 'styled-components';
import {
    Organization, OrganizationRoleWithAssoc,
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
    ListItemText, Typography, useTheme
} from "@material-ui/core";
import {RouteLink} from "@titan/components/routes";
import {
    ActivityIndicator,
    StyledActivityIndicator, StyledActivityIndicatorDot
} from "@titan/components/activity/activity_indicator";

export interface MemberListRowProps {
    organizations?: Organization[];
    role?: OrganizationRoleWithAssoc;
    user: UserProfile;
}

const StyledMemberListRow = styled.div`
  &:hover .member-title-line .username {
    text-decoration-color: ${props => props.underlineColor};
  }

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

  .member-title-line {
    align-items: center;
    display: flex;
    
    .username {
      text-decoration: underline transparent;
      transition: all 175ms ease-in-out;
    }

    .role {
      align-items: center;
      display: inline-flex;

      .spacer {
        font-size: 4px;
        margin: 0 8px;
      }
    }
  }
`;

export function MemberListRow(props: MemberListRowProps) {
    const theme = useTheme();
    return (
        <StyledMemberListRow
            indicatorBorderColor={theme.palette.background.paper}
            underlineColor={theme.palette.primary.main}>
            <RouteLink to={`/dashboard/members/${props.user.id}`} underline="none" color="textSecondary">
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
                            <div className="member-title-line">
                                <span className="username">{props.user.username}</span>
                                {props.role && (
                                  <span className="role">
                                      <i className="fas fa-circle spacer" />
                                      <Typography
                                          className="role-name"
                                          color="textSecondary"
                                          variant="caption">{props.role.role}</Typography>
                                  </span>
                                )}
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
