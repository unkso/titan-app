import React from 'react';
import PropTypes from 'prop-types';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import OrganizationsService from 'titan/http/OrganizationsService';
import { CardContent, CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
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
      childOrgs: []
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
    this.loadChildOrgs(this.props.organizationId);
  }

  loadChildOrgs (orgId) {
    this.organizationsHttpService.findChildren(orgId).then(res => {
      this.setState({ childOrgs: res.data });
    });
  }

  render () {
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
      </React.Fragment>
    );
  }
}

Overview.propTypes = {
  organizationId: PropTypes.number.isRequired
};
