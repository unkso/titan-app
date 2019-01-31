import * as React from 'react';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../../layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle from '../../../layouts/dashboard/components/PageHeader/PageHeaderTitle';
import { ContentBlock } from '../../../components/block/ContentBlock';
import BranchCardGrid from '../components/BranchCardGrid';
import OrganizationsService from '../../../http/OrganizationsService';

class BranchesScene extends React.Component {
  constructor (props) {
    super(props);

    this.organizationHttpService = new OrganizationsService();
    this.state = {
      branches: []
    };
  }

  componentDidMount () {
    this.organizationHttpService.findAll()
      .then((res) => {
        this.setState({
          branches: res.data
        });
      })
      .catch((err) => {
        // FIXME update UI to indicate error state.
        console.log(err);
      });
  }

  render () {
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
