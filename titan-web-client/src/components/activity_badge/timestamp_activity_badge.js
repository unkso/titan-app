import React from 'react';
import PropTypes from 'prop-types';
import ActivityBadge, {
  STATUS_ACTIVE,
  STATUS_RECENT,
  STATUS_INACTIVE
} from './activity_badge';

// Two days in seconds.
const TWO_DAYS = '86400';

// One week in seconds.
const ONE_WEEK = '604800';

/**
 * Shows an activity_badge, where the status is derived from a
 * timestamp.
 */
class TimestampActivityBadge extends React.Component {
  getStatusFromTimestamp (timestamp) {
    const nowInSeconds = (new Date()).getTime();
    const diff = nowInSeconds - timestamp;

    if (diff < TWO_DAYS) {
      return STATUS_ACTIVE;
    } else if (diff < ONE_WEEK) {
      return STATUS_RECENT;
    }

    return STATUS_INACTIVE;
  }

  render () {
    const status = this.getStatusFromTimestamp(this.props.timestamp);
    return (
      <ActivityBadge status={status}>
        {this.props.children}
      </ActivityBadge>
    );
  }
}

TimestampActivityBadge.propTypes = {
  timestamp: PropTypes.number
};

export default TimestampActivityBadge;
