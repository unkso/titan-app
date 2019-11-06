import React, { useState } from 'react';
import { DialogTitle, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

function LinkEditorControl (props) {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState(link);

  return (
    <React.Fragment>
      <Button>
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
      </Dialog>
    </React.Fragment>
  );
}

export const LINK_INLINE = {
  type: 'link',
  hotKey: 'mod+l',
  icon: (
    <LinkEditorControl />
  ),
  render: (attributes, data, children) => {
    return (
      <a {...attributes} href={data.href}>{children}</a>);
  }
};
