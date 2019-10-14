import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddMembersForm } from 'titan/components/members/form/AddMembersForm';
import DialogActions from '@material-ui/core/DialogActions';

/**
 * @param {{orgId, users, onClose, orgCoc}} props
 */
export function AddMembersDialog (props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <React.Fragment>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setDialogOpen(true)}>Add Members</Button>
      <Dialog fullWidth maxWidth="sm" open={dialogOpen}>
        <DialogTitle>Add Members</DialogTitle>
        <DialogContent>
          <AddMembersForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Done</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
