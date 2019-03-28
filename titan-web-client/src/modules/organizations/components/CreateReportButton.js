import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { CreateReportForm } from 'titan/modules/organizations/components/CreateReportForm';

export class CreateReportButton extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      dialogOpen: false,
      fields: []
    };
  }

  openDialog () {
    this.setState({ dialogOpen: true });
  }

  closeDialog () {
    this.setState({ dialogOpen: false });
  }

  updateField (field, value) {
    this.setState({ [field]: value });
  }

  isFormValid () {
    return true;
  }

  render () {
    return (
      <React.Fragment>
        <Button
          color="primary"
          onClick={() => this.openDialog()}
          variant="contained">Add Report</Button>
        <Dialog open={this.state.dialogOpen} maxWidth="sm" fullWidth>
          <DialogTitle>
            {this.props.organization.name} Weekly Report
          </DialogTitle>
          <DialogContent>
            <CreateReportForm
              fields={this.state.fields}
              onFieldChange={(field, value) => this.updateField(field, value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeDialog()}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

CreateReportButton.propsTypes = {
  organization: PropTypes.object
};
