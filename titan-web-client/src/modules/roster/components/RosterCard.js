import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography/Typography';
import BorderedCard from 'titan/components/Card/BorderedCard';
import TimestampActivityBadge
  from 'titan/components/ActivityBadge/TimestampActivityBadge';

/**
 * Shows an overview of a roster member in a content card.
 */
class RosterCard extends React.Component {
  render() {
    return (
      <BorderedCard>
        <CardContent>
          <div style={{ margin: '8px 0', textAlign: 'center' }}>
            <TimestampActivityBadge
              timestamp={this.props.user.last_activity_time}
            >
              <Avatar
                style={{ width: 75, height: 75, margin: 'auto' }}
                src={this.props.avatar}
              />
            </TimestampActivityBadge>
          </div>
          <Typography
            component="h3"
            align="center"
            gutterBottom
            noWrap
          >
            {this.props.user.username}
          </Typography>
          <Typography
            style={{ minHeight: '50px' }}
            align="center"
            component="p"
            color="textSecondary"
            dangerouslySetInnerHTML={{
              __html: this.props.user.user_title
            }}
            noWrap
          />
        </CardContent>
      </BorderedCard>
    );
  }
}

RosterCard.propTypes = {
  user: PropTypes.object,
  avatar: PropTypes.string
};

export default RosterCard;
