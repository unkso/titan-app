import * as React from 'react';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../../layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle from '../../../layouts/dashboard/components/PageHeader/PageHeaderTitle';
import { ContentBlock } from '../../../components/block/ContentBlock';
import BranchCardGrid from '../components/BranchCardGrid';

class BranchesScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      branches: [
        {
          name: 'Coast Guard',
          member_count: 15
        },
        {
          name: 'Navy',
          member_count: 15
        },
        {
          name: 'Air Force',
          member_count: 8
        }
      ]
    };
  }

  render() {
    if (!this.state.branches) {
      return null;
    }

    return (
      <div>
        <PageHeader>
          <PageHeaderTitle title="Branches" />
        </PageHeader>
        <ContentBlock>
          <BranchCardGrid branches={this.state.branches} />
        </ContentBlock>
      </div>
    );
  }
}

export default withRouter(BranchesScene);
