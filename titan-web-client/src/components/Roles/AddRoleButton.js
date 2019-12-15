import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ManageRoleDialog } from '@titan/components/organizations/roles/ManageRoleDialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeTitanApiRequest,
  SaveOrganizationRoleRequest
} from '@titan/http/ApiClient';
import * as orgActions from '@titan/actions/organization_actions';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import { getUserMessageFromError } from '@titan/lib/response';
import IconButton from '@material-ui/core/IconButton';

export function AddRoleButton (props) {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const roles = useSelector(state => state.organization.roles || []);
  const snackbar = useSnackbar();

  /**
   * @param {{role, assignee: {id}}} fields
   */
  function saveRole (fields) {
    const payload = {
      id: props.roleId,
      orgId: props.orgId,
      userId: fields.assignee ? fields.assignee.id : undefined,
      rank: roles.reduce(
        (maxRank, role) => Math.max(maxRank, role.rank), 0) + 1,
      role: fields.role
    };
    makeTitanApiRequest(SaveOrganizationRoleRequest, payload)
      .then(res => {
        const roleIndex = roles.findIndex(role => role.id === res.data.id);

        if (roleIndex !== -1) {
          const updatedRoles = [...roles];
          updatedRoles[roleIndex] = res.data;
          dispatch(orgActions.setRoles(updatedRoles));
        } else {
          dispatch(orgActions.setRoles([...roles, res.data]));
        }
        setDialogOpen(false);
        snackbar.enqueueSnackbar('Saved', { variant: 'success' });
      })
      .catch(err => {
        snackbar.enqueueSnackbar(
          getUserMessageFromError(err, 'Failed to save role'),
          { variant: 'error' });
      });
  }

  return (
    <React.Fragment>
      { props.roleId ? (
        <IconButton
          className="edit-icon"
          onClick={() => setDialogOpen(true)}
          style={{ fontSize: '0.9rem' }}>
          <i className="far fa-edit" />
        </IconButton>
      ) : (
        <Button
          color="primary"
          onClick={() => setDialogOpen(true)}
        >Add CoC Role</Button>
      )}
      <ManageRoleDialog
        initialRoleName={props.roleName}
        initialRoleAssignee={props.roleAssignee}
        open={dialogOpen}
        onSave={role => saveRole(role)}
        onRequestClose={() => setDialogOpen(false)}
      />
    </React.Fragment>
  );
}

AddRoleButton.propTypes = {
  orgId: PropTypes.number.isRequired,
  roleId: PropTypes.number,
  roleName: PropTypes.string,
  roleAssignee: PropTypes.object
};
