import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import BorderedCard from 'titan/components/Card/BorderedCard';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Avatar } from '@material-ui/core';

class RosterCard extends React.Component {
  render () {
    return (
      <BorderedCard>
        <CardActionArea onClick={() => {
          window.location = `/organizations/${this.props.branch.slug}`;
        }}>
          <CardContent>
            <Avatar
              style={{ width: 75, height: 75, margin: 'auto' }}
              src={this.props.branch.avatar_url} />
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              noWrap
            >
              {this.props.branch.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </BorderedCard>
    );
  }
}

RosterCard.propTypes = {
  branch: PropTypes.object
};

export default RosterCard;
