import React from 'react';
import {
  ListOrganizationUsersRequest,
  makeTitanApiRequest,
  RemoveUserFromOrganizationRequest,
  useTitanApiClient
} from 'titan/http/ApiClient';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import { UsersTable } from 'titan/components/members/table/UsersTable';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { AddMembersDialog } from 'titan/components/members/dialog/AddMembersDialog';
import { CardContent } from '@material-ui/core';
import { useSnackbar } from 'notistack';

/**
 * @param {{
 *  organizationId: number,
 *  canAddMembers: boolean,
 *  canRemoveMembers: boolean,
 *  orgCoc: []
 * }} props
 */
export function Members (props) {
  const snackbar = useSnackbar();
  const fetchUsers = useTitanApiClient(ListOrganizationUsersRequest,
    { orgId: props.organizationId });
  const userCount = fetchUsers.data ? fetchUsers.data.length : 0;
  const users = fetchUsers.data || [];

  function removeUser (user) {
    makeTitanApiRequest(RemoveUserFromOrganizationRequest,
      { orgId: props.organizationId, userId: user.id })
      .then(() => {
        fetchUsers.reload();
        snackbar.enqueueSnackbar('Member removed', {
          variant: 'success'
        });
      })
      .catch(() => {
        snackbar.enqueueSnackbar('Unable to remove member', {
          variant: 'error'
        });
      });
  }

  const removeUserFunc = props.canRemoveMembers ? removeUser : undefined;
  return (
    <React.Fragment>
      {props.canAddMembers &&
      <ContentBlock>
        <Typography align="right">
          <AddMembersDialog
            orgId={props.organizationId}
            orgCoc={props.orgCoc}
            users={users}
            onClose={() => fetchUsers.reload()}
          />
        </Typography>
      </ContentBlock>
      }
      <ContentBlock>
        <Card>
          <CardContent>
            <Typography align="right" style={{ marginTop: 8 }}>showing {userCount} of {userCount}</Typography>
          </CardContent>
          <UsersTable {...fetchUsers} onRemove={removeUserFunc} />
        </Card>
      </ContentBlock>
    </React.Fragment>
  );
}
