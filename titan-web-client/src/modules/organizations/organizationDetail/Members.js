import React, { useEffect } from 'react';
import {
  ListOrganizationMembersRequest,
  makeTitanApiRequest,
  RemoveUserFromOrganizationRequest
} from 'titan/http/ApiClient';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import { UsersTable } from 'titan/components/members/table/UsersTable';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { AddMembersDialog } from 'titan/components/members/dialog/AddMembersDialog';
import { CardContent } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import * as orgActions from 'titan/actions/organizationActions';

/**
 * @param {{
 *  organizationId: number,
 *  canAddMembers: boolean,
 *  canRemoveMembers: boolean
 * }} props
 */
export function Members (props) {
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const members = useSelector(state => state.organization.members);
  const memberCount = members ? members.length : 0;

  useEffect(() => {
    loadMembers();
  }, [props.organizationId]);

  function loadMembers () {
    makeTitanApiRequest(ListOrganizationMembersRequest,
      { orgId: props.organizationId })
      .then(res => {
        dispatch(orgActions.setMembers(res.data));
      });
  }

  function removeUser (member) {
    makeTitanApiRequest(RemoveUserFromOrganizationRequest,
      { orgId: props.organizationId, userId: member.id })
      .then(() => {
        dispatch(orgActions.removeMember(member));
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
          <AddMembersDialog />
        </Typography>
      </ContentBlock>
      }
      <ContentBlock>
        <Card>
          <CardContent>
            <Typography align="right" style={{ marginTop: 8 }}>showing {memberCount} of {memberCount}</Typography>
          </CardContent>
          <UsersTable
            data={members || []}
            loading={members !== null}
            onRemove={removeUserFunc}
          />
        </Card>
      </ContentBlock>
    </React.Fragment>
  );
}
