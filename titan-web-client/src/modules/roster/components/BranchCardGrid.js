import React from 'react';
import PropTypes from 'prop-types';
import Column from 'titan/components/Grid/Column';
import Row from 'titan/components/Grid/Row';
import BranchCard from 'titan/modules/roster/components/BranchCard';

/**
 * Lists roster member cards in a grid.
 */
class BranchCardGrid extends React.Component {
  constructor(props) {
    super(props);

    this.sluggify = this.sluggify.bind(this);
  }

  sluggify(branchName) {
    return branchName.toLowerCase().split(' ').join('-');
  }

  render() {
    return (
      <Row wrap="wrap">
        {this.props.branches.map((branch, index) => (
          <Column
            basis="33.3333%"
            basisLg="50%"
            basisMd="100%"
            basisSm="100%"
            key={index}
          >
            <BranchCard
              branch={branch}
              sluggify={this.sluggify} />
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
