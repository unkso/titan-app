import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PageHeader from 'titan/layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle from 'titan/layouts/dashboard/components/PageHeader/PageHeaderTitle';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import RosterCardGrid from '../components/RosterCardGrid';
import OrganizationsService from 'titan/http/OrganizationsService';

class BranchScene extends React.Component {
  constructor(props) {
    super(props);

    this.organizationsHttpService = new OrganizationsService();
    this.state = {
      branch: null,
      users: []
    };
  }

  componentDidMount() {
    this.organizationsHttpService.findBySlug(this.props.match.params.slug)
      .then((res) => {
        this.setState({
          branch: res.data.organization,
          users: res.data.users
        });
      })
      .catch((err) => {
        // @todo Render 404 error
        console.log(err);
      });
  }

  render() {
    if (!this.state.branch) {
      return null;
    }

    return (
      <div>
        <PageHeader>
          <PageHeaderTitle title={this.state.branch.name} />
        </PageHeader>
        <ContentBlock>
          <RosterCardGrid roster={this.state.users} />
        </ContentBlock>
      </div>
    );
  }
}

BranchScene.propTypes = {
  match: PropTypes.object
};

export default withRouter(BranchScene);
