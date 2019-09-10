import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const StyledMemberNameTag = styled.div`
  align-items: center;
  display: flex;
  flex-direction: ${props => props.avatarPosition === 'top' ? 'column' : 'row'};
  text-align: ${props => props.avatarPosition === 'top' ? 'center' : props.avatarPosition};
  
  .username {
    font-size: 14px;
  }

  .detail-label {
    font-size: 12px;
  }

  &.small {
    .avatar {
      height: 32px;
      width: 32px;
    }
    
    .username {
      font-size: 16px;
    }
    
    .detail-label {
      font-size: 13px;
    }
  }
  
  &.medium {
    .avatar {
      height: 36px;
      width: 36px;
    }
  
    .username {
      font-size: 16px;
    }
  
    .detail-label {
      font-size: 13px;
    }
  }
  
  &.large {
    .avatar {
      height: 48px;
      width: 48px;
    }

    .username {
      font-size: 16px;
    }

    .detail-label {
      font-size: 14px;
    }
  }

  .avatar {
    height: 24px;
    width: 24px;

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

/**
 * Displays general information about a titan user, including their
 * name and an optional label (i.e. role, organization, etc.).
 *
 * @example
 * <MemberNameTag
 *   avatarUrl={avatarUrl}
 *   avatarPosition="left"
 *   label={organizationName}
 *   labelPosition="below"
 *   username={username}"
 * />
 */
export function MemberNameTag (props) {
  const avatarClass = `avatar ${props.avatarPosition}`;
  return (
    <StyledMemberNameTag avatarPosition={props.avatarPosition} className={props.size}>
      <Avatar
        className={avatarClass}
        component="div"
        src={props.avatarUrl}
      />
      <StyledMemberNameTagDetails labelPosition={props.labelPosition}>
        <Typography component="div" className="username">
          {props.username}
        </Typography>
        <Typography
          className="detail-label"
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
  username: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

MemberNameTag.defaultProps = {
  avatarPosition: 'left',
  labelPosition: 'below',
  size: ''
};
