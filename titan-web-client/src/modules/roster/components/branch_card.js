import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import BorderedCard from '@titan/components/card/bordered_card';
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { RouteButton } from '@titan/components/routes/route_link';
import { routeBuilder } from '@titan/lib/routes';
import { ORGANIZATIONS_DETAIL_ROUTE } from '@titan/modules/organizations/routes';

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
              to={routeBuilder(ORGANIZATIONS_DETAIL_ROUTE, [this.props.branch.slug])}>View</Button>
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
