import React from 'react';
import {
  ListOrganizationUsersRequest,
  useTitanApiClient
} from 'titan/http/ApiClient';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import { UsersTable } from 'titan/components/members/table/UsersTable';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { AddMembersDialog } from 'titan/components/members/dialog/AddMembersDialog';
import { CardContent } from '@material-ui/core';

/**
 * @param {{
 *  organizationId: number,
 *  canAddMembers: boolean,
 *  orgCoc: []
 * }} props
 */
export function Members (props) {
  const fetchUsers = useTitanApiClient(ListOrganizationUsersRequest,
    { org_id: props.organizationId });
  const userCount = fetchUsers.data ? fetchUsers.data.length : 0;
  const users = fetchUsers.data || [];

  function reloadMembersList () {
    fetchUsers.reload();
  }

  return (
    <React.Fragment>
      {props.canAddMembers &&
      <ContentBlock>
        <Typography align="right">
          <AddMembersDialog
            orgId={props.organizationId}
            orgCoc={props.orgCoc}
            users={users}
            onClose={() => reloadMembersList()}
          />
        </Typography>
      </ContentBlock>
      }
      <ContentBlock>
        <Card>
          <CardContent>
            <Typography align="right" style={{ marginTop: 8 }}>showing {userCount} of {userCount}</Typography>
          </CardContent>
          <UsersTable {...fetchUsers} />
        </Card>
      </ContentBlock>
    </React.Fragment>
  );
}
