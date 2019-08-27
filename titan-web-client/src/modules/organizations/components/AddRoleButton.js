import React from 'react';
import CreateForm from 'titan/components/FileEntry/CreateForm';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';

export function AddRoleButton (props) {
  return (
    <Dialog open={this.state.open} fullWidth>
      <DialogTitle>Organization Role</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="Role name"
        />
      </DialogContent>
    </Dialog>
  );
}
