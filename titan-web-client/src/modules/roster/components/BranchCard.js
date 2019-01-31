import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import BorderedCard from 'titan/components/Card/BorderedCard';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Avatar } from '@material-ui/core';

class RosterCard extends React.Component {
  render() {
    return (
      <BorderedCard>
        <CardActionArea onClick={() => {
          window.location = `/branch/${this.props.sluggify(this.props.branch.name)}`;
        }}>
          <CardContent>
            <Avatar
              style={{ width: 75, height: 75, margin: 'auto' }}
              src={this.props.branch.avatar} />
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              noWrap
            >
              {this.props.branch.name}
            </Typography>
            <Typography
              style={{ minHeight: '50px' }}
              align="center"
              variant="h6"
              color="textSecondary"
              dangerouslySetInnerHTML={{
                __html: `Member count: ${this.props.branch.member_count}`
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
  branch: PropTypes.object,
  sluggify: PropTypes.func
};

export default RosterCard;
