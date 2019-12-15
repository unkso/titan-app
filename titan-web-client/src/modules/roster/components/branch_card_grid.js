import React from 'react';
import PropTypes from 'prop-types';
import Column from '@titan/components/grid/column';
import Row from '@titan/components/grid/row';
import BranchCard from '@titan/modules/roster/components/branch_card';

/**
 * Lists roster member cards in a grid.
 */
class BranchCardGrid extends React.Component {
  render () {
    return (
      <Row wrap="wrap">
        {this.props.branches.filter(e => e.is_enabled).map((branch, index) => (
          <Column
            basis="33.3333%"
            basisLg="50%"
            basisMd="100%"
            basisSm="100%"
            key={index}
          >
            <BranchCard branch={branch} />
          </Column>
        ))}
      </Row>
    );
  }
}

BranchCardGrid.propTypes = {
  branches: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BranchCardGrid;
