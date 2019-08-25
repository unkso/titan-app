import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

/**
 * Displays general information about a titan user, including their
 * name and an optional label (i.e. role, organization, etc.).
 *
 * {@code
 * <MemberNameTag
 *   avatarUrl={avatarUrl}
 *   avatarPosition="left"
 *   label={organizationName}
 *   labelPosition="below"
 *   username={username}"
 * />
 * }
 */
export const StyledMemberNameTag = styled.div`
  align-items: center;
  display: flex;
  flex-direction: ${props => props.avatarPosition === 'top' ? 'column' : 'row'};
  text-align: ${props => props.avatarPosition === 'top' ? 'center' : props.avatarPosition};

  .avatar {
    height: 50px;
    width: 50px;

    &.top {
      margin-bottom: 8px;
    }

    &.left {
      margin-right: 8px;
      order: 0;
    }

    &.right {
      margin-left: 8px;
      order: 2;
    }
  }
`;

export const StyledMemberNameTagDetails = styled.div`
  display: flex;
  flex-direction: column;

  .profile-label {
    order: ${props => props.labelPosition === 'above' ? 0 : 2};
  }
`;

export function MemberNameTag (props) {
  const avatarClass = `avatar ${props.avatarPosition}`;
  return (
    <StyledMemberNameTag avatarPosition={props.avatarPosition}>
      <Avatar
        className={avatarClass}
        component="div"
        src={props.avatarUrl}
      />
      <StyledMemberNameTagDetails labelPosition={props.labelPosition}>
        <Typography component="div">{props.username}</Typography>
        <Typography
          className="profile-label"
          color="textSecondary"
          component="div">{props.label}</Typography>
      </StyledMemberNameTagDetails>
    </StyledMemberNameTag>
  );
}

MemberNameTag.propTypes = {
  avatarUrl: PropTypes.string,
  avatarPosition: PropTypes.oneOf(['left', 'right', 'top']),
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  labelPosition: PropTypes.oneOf(['above', 'below']),
  username: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired
};
