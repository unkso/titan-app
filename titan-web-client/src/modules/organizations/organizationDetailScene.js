import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle from '../../layouts/dashboard/components/PageHeader/PageHeaderTitle';
import OrganizationsService from '../../http/OrganizationsService';
import { Tab, Tabs } from '@material-ui/core';
import { connect } from 'react-redux';
import { Overview } from 'titan/modules/organizations/organizationDetail/Overview';
import { Reports } from 'titan/modules/organizations/organizationDetail/Reports';
import { Members } from 'titan/modules/organizations/organizationDetail/Members';

class OrganizationDetailSceneComponent extends React.Component {
  constructor (props) {
    super(props);

    this.organizationsService = new OrganizationsService();
    this.state = {
      hasLocalCocRole: false,
      isMemberOfCoc: false,
      loading: true,
      organization: null,
      tab: 0
    };
  }

  componentDidMount () {
    this.organizationsService.findBySlug(this.props.match.params.slug)
      .then((res) => {
        this.setState({ organization: res.data.organization });
        return this.organizationsService.findChainOfCommand(
          res.data.organization.id);
      })
      .then((res) => {
        const coc = res.data.local_coc.concat(res.data.extended_coc);
        const userId = this.props.auth.session.user.id;

        this.setState({
          hasLocalCocRole: !!res.data.local_coc.find(
            role => role.user_profile.id === userId),
          isMemberOfCoc: !!coc.find(role =>
            role.user_profile.id === userId)
        });
      })
      .catch(e => {
        window.location = '/organizations';
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  setTab (index) {
    this.setState({ tab: index });
  }

  render () {
    if (!this.state.organization) {
      return null;
    }

    const headerTabs = [
      <Tab key={0} label="Overview" />,
      <Tab key={1} label="Members" />
    ];
    if (this.state.isMemberOfCoc) {
      headerTabs.push(<Tab key={2} label="Reports" />);
    }

    return (
      <React.Fragment>
        <PageHeader>
          <PageHeaderTitle title={this.state.organization.name} />
          <Tabs
            onChange={(e, index) => this.setTab(index)}
            value={this.state.tab}>
            {headerTabs}
          </Tabs>
        </PageHeader>

        {this.state.tab === 0 &&
          <Overview organizationId={this.state.organization.id} />
        }

        {this.state.tab === 1 &&
          <Members organizationId={this.state.organization.id} />
        }

        {this.state.tab === 2 &&
          <Reports
            canCreateReport={this.state.hasLocalCocRole}
            organization={this.state.organization}
          />
        }
      </React.Fragment>
    );
  }
}

OrganizationDetailSceneComponent.propTypes = {
  match: PropTypes.object
};

function mapStateToProps (state) {
  return {
    auth: state.auth
  };
}

export const OrganizationDetailScene = withRouter(
  connect(mapStateToProps)(OrganizationDetailSceneComponent));
