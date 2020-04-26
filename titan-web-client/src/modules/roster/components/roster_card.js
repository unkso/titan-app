import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import BorderedCard from '@titan/components/card/bordered_card';
import { CardActionArea } from '@material-ui/core';

/**
 * Shows an overview of a roster member in a content card.
 */
class RosterCard extends React.Component {
  render () {
    return (
      <BorderedCard>
        <CardActionArea onClick={() => {
          window.location = `/roster/${this.props.user.id}`;
        }}>
          <CardContent>
            <Typography
              variant="h3"
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
                __html: this.props.user.wcf.user_title
              }}
              noWrap
            />
          </CardContent>
        </CardActionArea>
      </BorderedCard>
    );
  }
}

RosterCard.propTypes = {
  user: PropTypes.object,
  avatar: PropTypes.string
};

export default RosterCard;
