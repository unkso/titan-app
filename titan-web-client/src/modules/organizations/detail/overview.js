import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContentBlock } from '@titan/components/block/content_block';
import { CardContent, CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Organization_chan_of_command } from '@titan/modules/organizations/components/organization_chan_of_command';
import Row from '@titan/components/grid/row';
import Column from '@titan/components/grid/column';
import { List_support_leadership } from '@titan/modules/organizations/components/list_support_leadership';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { RouteButton } from '@titan/components/routes/route_link';
import { useDispatch, useSelector } from 'react-redux';
import * as orgActions from '@titan/actions/organization_actions';
import {
  ListOrganizationChildrenRequest,
  makeTitanApiRequest
} from '@titan/http/api_client';

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
              <Organization_chan_of_command orgCoc={props.orgCoc} />
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
              <List_support_leadership
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
