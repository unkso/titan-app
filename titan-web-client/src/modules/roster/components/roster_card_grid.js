import React from 'react';
import PropTypes from 'prop-types';
import Column from '@titan/components/grid/column';
import Row from '@titan/components/grid/row';
import RosterCard from '@titan/modules/roster/components/roster_card';

/**
 * Lists roster member cards in a grid.
 */
class RosterCardGrid extends React.Component {
  render () {
    return (
      <Row wrap="wrap">
        {this.props.roster.map((member, index) => (
          <Column
            basis="33.3333%"
            basisLg="50%"
            basisMd="100%"
            basisSm="100%"
            key={index}
          >
            <RosterCard
              user={member}
              avatar={member.wcf.avatar_url} />
          </Column>
        ))}
      </Row>
    );
  }
}

RosterCardGrid.propTypes = {
  roster: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RosterCardGrid;
