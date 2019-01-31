import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

// User has been online in the past 48 hours.
export const STATUS_ACTIVE = 'active';

// User has been online in the past week.
export const STATUS_RECENT = 'recent';

// User has been not been online for over 1 week.
export const STATUS_INACTIVE = 'inactive';

// User is on leave.
export const STATUS_LEAVE = 'leave';

export const ActivityBadgeStyle = styled.div`
  display: ${props => props.hasChildren ? 'inline-block' : 'block'};
  position: relative;
  margin: auto;
`;

export const ActivityBadgeIndicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${props => props.bgColor};
  border-radius: 50%;
  border: 2px solid #fff;
  position: absolute;
  left: 2px;
  bottom: 2px;
`;

/**
 * A color-coded badge that indicates the recency of a user's activity.
 */
class ActivityBadge extends React.Component {
  getStatusColor(status) {
    switch (status) {
      case STATUS_ACTIVE:
        return this.props.theme.palette.success;
      case STATUS_RECENT:
        return this.props.theme.palette.warning;
      case STATUS_LEAVE:
        return this.props.theme.palette.info;
      default:
        // Default is inactive status.
        return this.props.theme.palette.danger;
    }
  }

  render() {
    const color = this.getStatusColor(this.props.status);
    console.log(!!this.props.children);
    return (
      <ActivityBadgeStyle hasChildren={!!this.props.children}>
        {this.props.children}
        <Tooltip title={this.props.status}>
          <ActivityBadgeIndicator bgColor={color} />
        </Tooltip>
      </ActivityBadgeStyle>
    );
  }
}

ActivityBadge.propTypes = {
  status: PropTypes.oneOf([
    STATUS_ACTIVE,
    STATUS_RECENT,
    STATUS_INACTIVE,
    STATUS_LEAVE
  ])
};

export default withTheme()(ActivityBadge);
