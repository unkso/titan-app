import React, { useState } from 'react';
import { DialogTitle, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

function LinkEditorControl (props) {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState(link);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>
        <span className="fas fa-link" />
      </Button>
      <Dialog open={open}>
        <DialogTitle>Add a link</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            placeholder="https://"
            onChange={e => setLink(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpen(false)}>Close</Button>
          <Button color="primary">Apply</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export const LINK_INLINE = {
  type: 'link',
  hotKey: 'mod+l',
  icon: (onApply) => <LinkEditorControl onApply={onApply} />,
  render: (attributes, data, children) => {
    return (
      <a {...attributes} href={data.href}>{children}</a>);
  }
};
