import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContentBlock } from '@titan/components/block/ContentBlock';
import { CardContent, CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { OrganizationChainOfCommand } from '@titan/modules/organizations/components/OrganizationChainOfCommand';
import Row from '@titan/components/Grid/Row';
import Column from '@titan/components/Grid/Column';
import { ListSupportLeadership } from '@titan/modules/organizations/components/ListSupportLeadership';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { RouteButton } from '@titan/components/Routes/RouteLink';
import { useDispatch, useSelector } from 'react-redux';
import * as orgActions from '@titan/actions/organization_actions';
import {
  ListOrganizationChildrenRequest,
  makeTitanApiRequest
} from '@titan/http/ApiClient';

const CoCActions = styled.div`
  font-size: 12px;
  margin-top: 4px;
  text-align: center;

  > a {
    margin: 4px;
  }
`;

export function Overview (props) {
  const dispatch = useDispatch();
  const childOrgs = useSelector(
    state => state.organization.children || []);

  useEffect(() => {
    makeTitanApiRequest(ListOrganizationChildrenRequest, { orgId: props.orgId })
      .then(res => {
        dispatch(orgActions.setChildren(res.data));
      });
  }, [props.orgId]);

  return (
    <ContentBlock>
      <Row>
        <Column basis="66%" basisMd="100%">
          <Card>
            <CardHeader title="Chain of Command" />
            <CardContent>
              <OrganizationChainOfCommand orgCoc={props.orgCoc} />
              <CoCActions>
                {childOrgs.filter(childOrg => childOrg.is_enabled).map((org, key) => (
                  <Button
                    color="secondary"
                    component={RouteButton}
                    to={`/organizations/${org.slug}`}
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
                organizationId={props.orgId} />
            </CardContent>
          </Card>
        </Column>
      </Row>
    </ContentBlock>
  );
}

Overview.propTypes = {
  orgId: PropTypes.number.isRequired,
  orgCoc: PropTypes.object
};
