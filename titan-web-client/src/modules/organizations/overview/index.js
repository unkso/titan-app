import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PageHeader from 'titan/layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle from 'titan/layouts/dashboard/components/PageHeader/PageHeaderTitle';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import OrganizationsService from 'titan/http/OrganizationsService';
import RosterCardGrid from 'titan/modules/roster/components/RosterCardGrid';
import CircularProgress
  from '@material-ui/core/es/CircularProgress/CircularProgress';

class OverviewScene extends React.Component {
  constructor (props) {
    super(props);

    this.organizationsHttpService = new OrganizationsService();
    this.state = {
      organization: null,
      users: [],
      loadingUsers: true
    };
  }

  componentDidMount () {
    const { type, ...params } = this.props.match.params;
    const path = Object.values(params).join('/');
    this.organizationsHttpService.findByPath(type, path)
      .then((res) => {
        this.setState({ organization: res.data });
        this.organizationsHttpService.findUsers(res.data.id)
          .then((res) => {
            this.setState({ users: res.data, loadingUsers: false });
          });
      })
      .catch((err) => {
        // @todo Render 404 error
        console.log(err);
      });
  }

  render () {
    if (!this.state.organization) {
      return null;
    }

    return (
      <React.Fragment>
        <PageHeader>
          <PageHeaderTitle title={this.state.organization.name} />
        </PageHeader>
        <ContentBlock>
          {this.state.loadingUsers
            ? <CircularProgress />
            : <RosterCardGrid roster={this.state.users} />
          }
        </ContentBlock>
      </React.Fragment>
    );
  }
}

OverviewScene.propTypes = {
  match: PropTypes.object
};

export default withRouter(OverviewScene);
