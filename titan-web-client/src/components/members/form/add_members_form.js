import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useThrottle } from '@titan/hooks';
import {
  AddUserToOrganizationRequest,
  ListUsersRequest,
  makeTitanApiRequest,
  useTitanApiClient
} from '@titan/http/api_client';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Column from '@titan/components/grid/column';
import Avatar from '@material-ui/core/Avatar';
import Row from '@titan/components/grid/row';
import { Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import * as orgActions from '@titan/actions/organization_actions';

export function AddMembersForm () {
  const dispatch = useDispatch();
  const orgId = useSelector(state => state.organization.details.id);
  const chainOfCommand = useSelector(state =>
    state.organization.chainOfCommand);
  const members = useSelector(state => state.organization.members);
  const [addedUsers, setAddedUsers] = useState([]);
  const [username, setUsername] = useThrottle('', 325);
  const fetchUsers = useTitanApiClient(
    ListUsersRequest, { username, limit: 5 });
  const snackbar = useSnackbar();

  useEffect(() => {
    setAddedUsers(members.map(user => user.id)
      .concat(chainOfCommand.local_coc.map(role => role.user_profile.id))
      .concat(chainOfCommand.extended_coc.map(role => role.user_profile.id)));
  }, [members]);

  // TODO Handle users already assigned to role in COC.
  function addMember (member) {
    makeTitanApiRequest(AddUserToOrganizationRequest, { orgId, userId: member.id })
      .then(() => {
        dispatch(orgActions.addMember(member));
        setAddedUsers([...addedUsers, member.id]);
        snackbar.enqueueSnackbar('Member added', {
          variant: 'success'
        });
      })
      .catch(() => {
        snackbar.enqueueSnackbar('Unable to add member', {
          variant: 'error'
        });
      });
  }

  return (
    <div>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span className="fas fa-search" />
            </InputAdornment>
          )
        }}
        placeholder="Search by username"
        onChange={e => setUsername(e.target.value)}
      />
      <List dense style={{ height: 285 }}>
        {fetchUsers.data && fetchUsers.data.map((user, index) => (
          <ListItem key={index} button>
            <Row alignItems="center" alignContent="center">
              <Column>
                <Avatar
                  style={{ width: 20, height: 20 }}
                  src={user.wcf.avatar_url}
                />
              </Column>
              <Column>{user.username}</Column>
              <Column grow={1}>
                <Typography align="right">
                  {addedUsers.includes(user.id) ? (
                    <Button disabled color="primary">Added</Button>
                  ) : (
                    <Button
                      color="primary"
                      onClick={() => addMember(user)}>Add</Button>
                  )}
                </Typography>
              </Column>
            </Row>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
