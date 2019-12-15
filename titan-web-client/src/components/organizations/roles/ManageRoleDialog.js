import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Row from '@titan/components/Grid/Row';
import Column from '@titan/components/Grid/Column';
import TextField from '@material-ui/core/TextField';
import { MemberAutocomplete } from '@titan/components/members/form/MemberAutocomplete';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React, { useEffect, useState } from 'react';

export function ManageRoleDialog (props) {
  const [roleName, setRoleName] = useState('');
  const [assignee, setAssignee] = useState();

  useEffect(() => {
    setRoleName(props.initialRoleName);
    setAssignee(props.initialRoleAssignee);
  }, [props.initialRoleName, props.initialRoleAssignee]);

  function isValid () {
    return roleName && roleName.trim() !== '';
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.open}>
      <DialogTitle>Manage Role</DialogTitle>
      <DialogContent style={{ minHeight: 150 }}>
        <Row alignItems="center" alignContent="center">
          <Column grow={1}>
            <TextField
              fullWidth
              label="Role name"
              onChange={e => setRoleName(e.target.value)}
              value={roleName}
            />
          </Column>
        </Row>
        <Row alignItems="center" alignContent="center">
          <Column grow={1}>
            <MemberAutocomplete
              defaultValue={props.initialRoleAssignee}
              inputLabel="Assignee"
              inputPlaceholder="unassigned"
              onChange={value => setAssignee(value)}
            />
          </Column>
        </Row>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.onRequestClose()}>Cancel</Button>
        <Button
          color="primary"
          disabled={!isValid()}
          onClick={() => props.onSave({ role: roleName, assignee })}
        >Save</Button>
      </DialogActions>
    </Dialog>
  );
}
