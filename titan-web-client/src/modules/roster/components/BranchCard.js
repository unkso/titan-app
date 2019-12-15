import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import BorderedCard from '@titan/components/Card/BorderedCard';
import { Avatar } from '@material-ui/core';
import {
  ORGANIZATION_DETAILS_ROUTE,
  routeBuilder
} from '@titan/routes';
import Button from '@material-ui/core/Button';
import { RouteButton } from '@titan/components/Routes/RouteLink';

class RosterCard extends React.Component {
  render () {
    return (
      <BorderedCard hoverElevation={0}>
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
          <Typography align="center">
            <Button
              color="primary"
              component={RouteButton}
              to={routeBuilder(ORGANIZATION_DETAILS_ROUTE, [this.props.branch.slug])}>View</Button>
          </Typography>
        </CardContent>
      </BorderedCard>
    );
  }
}

RosterCard.propTypes = {
  branch: PropTypes.object
};

export default RosterCard;
