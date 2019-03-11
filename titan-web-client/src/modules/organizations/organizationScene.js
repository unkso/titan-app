import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle from '../../layouts/dashboard/components/PageHeader/PageHeaderTitle';
import { ContentBlock } from '../../components/block/ContentBlock';
import RosterCardGrid from '../roster/components/RosterCardGrid';
import OrganizationsService from '../../http/OrganizationsService';
import { CardContent, CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { OrganizationChainOfCommand } from 'titan/modules/organizations/components/OrganizationChainOfCommand';
import Row from 'titan/components/Grid/Row';
import Column from 'titan/components/Grid/Column';
import { ListSupportLeadership } from 'titan/modules/organizations/components/ListSupportLeadership';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const CoCActions = styled.div`
  font-size: 12px;
  margin-top: 4px;
  text-align: center;

  > button {
    margin: 8px;
  }
`;

class OrganizationScene extends React.Component {
  constructor (props) {
    super(props);

    this.organizationsHttpService = new OrganizationsService();
    this.state = {
      organization: null,
      childOrgs: [],
      users: []
    };
  }

  componentDidMount () {
    this.organizationsHttpService.findBySlug(this.props.match.params.slug)
      .then((res) => {
        this.setState({ organization: res.data.organization });
        this.loadUsers(res.data.organization.id);
        this.loadChildOrgs(res.data.organization.id);
      })
      .catch((err) => {
        // @todo Render 404 error
        console.log(err);
      });
  }

  loadUsers (orgId) {
    this.organizationsHttpService.findUsers(orgId)
      .then(res => {
        this.setState({ users: res.data });
      });
  }

  loadChildOrgs (orgId) {
    this.organizationsHttpService.findChildren(orgId)
      .then(res => {
        this.setState({ childOrgs: res.data });
      });
  }

  render () {
    if (!this.state.organization) {
      return null;
    }

    const memberButtonLabel = this.state.users.length !== 1
      ? 'members'
      : 'member';

    return (
      <React.Fragment>
        <PageHeader>
          <PageHeaderTitle title={this.state.organization.name} />
        </PageHeader>
        <ContentBlock>
          <Row>
            <Column basis="66%" basisMd="100%">
              <Card>
                <CardHeader title="Chain of Command" />
                <CardContent>
                  <OrganizationChainOfCommand
                    organizationId={this.state.organization.id} />
                  <CoCActions>
                    {this.state.childOrgs.map(org => (
                      <Button
                        color="secondary"
                        href={`/organizations/${org.slug}`}
                        size="small"
                        variant="outlined">
                        {org.name}
                      </Button>
                    ))}

                    <Button variant="outline" color="secondary" disabled>
                      {this.state.users.length} {memberButtonLabel}
                    </Button>
                  </CoCActions>
                </CardContent>
              </Card>
            </Column>
            <Column basis="33%" basisMd="100%">
              <Card>
                <CardHeader title="Support Leadership" />
                <CardContent>
                  <ListSupportLeadership
                    organizationId={this.state.organization.id} />
                </CardContent>
              </Card>
            </Column>
          </Row>
        </ContentBlock>

        {this.state.users.length > 0 &&
        <ContentBlock>
          <Typography variant="h2">Members</Typography>
          <RosterCardGrid roster={this.state.users} />
        </ContentBlock>
        }
      </React.Fragment>
    );
  }
}

OrganizationScene.propTypes = {
  match: PropTypes.object
};

export default withRouter(OrganizationScene);
