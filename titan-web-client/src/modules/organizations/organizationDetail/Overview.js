import React from 'react';
import PropTypes from 'prop-types';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import RosterCardGrid from 'titan/modules/roster/components/RosterCardGrid';
import OrganizationsService from 'titan/http/OrganizationsService';
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

export class Overview extends React.Component {
  constructor (props) {
    super(props);

    this.organizationsHttpService = new OrganizationsService();
    this.state = {
      childOrgs: [],
      users: []
    };
  }

  componentDidMount () {
    this.init();
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.organizationId !== this.props.organizationId) {
      this.init();
    }
  }

  init () {
    this.loadUsers(this.props.organizationId);
    this.loadChildOrgs(this.props.organizationId);
  }

  loadUsers (orgId) {
    this.organizationsHttpService.findUsers(orgId).then(res => {
      this.setState({ users: res.data });
    });
  }

  loadChildOrgs (orgId) {
    this.organizationsHttpService.findChildren(orgId).then(res => {
      this.setState({ childOrgs: res.data });
    });
  }

  render () {
    const memberButtonLabel = this.state.users.length !== 1
      ? 'members'
      : 'member';

    return (
      <React.Fragment>
        <ContentBlock>
          <Row>
            <Column basis="66%" basisMd="100%">
              <Card>
                <CardHeader title="Chain of Command" />
                <CardContent>
                  <OrganizationChainOfCommand
                    organizationId={this.props.organizationId} />
                  <CoCActions>
                    {this.state.childOrgs.map((org, key) => (
                      <Button
                        color="secondary"
                        href={`/organizations/${org.slug}`}
                        key={key}
                        size="small"
                        variant="outlined">
                        {org.name}
                      </Button>
                    ))}

                    <Button
                      color="secondary"
                      disabled
                      size="small"
                      variant="outlined">
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
                    organizationId={this.props.organizationId} />
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

Overview.propTypes = {
  organizationId: PropTypes.number.isRequired
};
