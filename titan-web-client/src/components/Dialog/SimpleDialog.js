import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
import DialogTitle from '@material-ui/core/es/DialogTitle/DialogTitle';
import DialogContentText
  from '@material-ui/core/es/DialogContentText/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/es/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';

class SimpleDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.closeDialogHandler = this.closeDialog.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.open !== this.props.open) {
      this.updateDialogState(this.props.open);
    }
  }

  updateDialogState(open) {
    this.setState({ open });
  }

  closeDialog() {
    this.updateDialogState(false);
  }

  render() {
    return (
      <Dialog open={this.state.open}>
        {this.props.children}
        <DialogActions>
          <Button onClick={this.closeDialogHandler}>Close</Button>
          {this.props.actions}
        </DialogActions>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  actions: PropTypes.array
};

export default SimpleDialog;
