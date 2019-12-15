import * as React from 'react';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../layouts/dashboard/components/page_header/page_header';
import PageHeaderTitle from '../../layouts/dashboard/components/page_header/page_header_title';
import { ContentBlock } from '../../components/block/content_block';
import BranchCardGrid from '../roster/components/branch_card_grid';
import OrganizationsService from '../../http/OrganizationsService';

class Organization_list_scene extends React.Component {
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
      <React.Fragment>
        <PageHeader>
          <PageHeaderTitle title="Branches" />
        </PageHeader>
        <ContentBlock>
          <BranchCardGrid branches={this.state.branches} />
        </ContentBlock>
      </React.Fragment>
    );
  }
}

export default withRouter(Organization_list_scene);
