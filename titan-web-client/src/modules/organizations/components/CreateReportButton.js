import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { CreateReportForm } from 'titan/modules/organizations/components/CreateReportForm';
import Row from 'titan/components/Grid/Row';
import Column from 'titan/components/Grid/Column';
import { FileEntryList } from 'titan/modules/roster/profile/components/FileEntryList';

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
    return this.state.termStartDate && this.state.comments;
  }

  render () {
    return (
      <React.Fragment>
        <Button
          color="primary"
          onClick={() => this.openDialog()}
          variant="contained">Add Report</Button>
        <Dialog open={this.state.dialogOpen} maxWidth="lg" fullWidth>
          <DialogTitle>
            {this.props.organization.name} Weekly Report
          </DialogTitle>
          <DialogContent>
            <Row>
              <Column basis="60%">
                <CreateReportForm
                  fields={this.state.fields}
                  onFieldChange={(field, value) => this.updateField(field, value)}
                />
              </Column>
              <Column basis="40%">
                <FileEntryList items={[
                  {
                    file_entry_type: { name: 'practice' },
                    start_date: '2019-01-01',
                    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate lacus et ex posuere condimentum.'
                  },
                  {
                    file_entry_type: { name: 'practice' },
                    start_date: '2019-01-01',
                    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate lacus et ex posuere condimentum.'
                  },
                  {
                    file_entry_type: { name: 'practice' },
                    start_date: '2019-01-01',
                    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate lacus et ex posuere condimentum.'
                  }
                ]} />
              </Column>
            </Row>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeDialog()}>Close</Button>
            <Button
              color="primary"
              disabled={!this.isFormValid()}
              onClick={() => this.closeDialog()}>Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

CreateReportButton.propsTypes = {
  organization: PropTypes.object
};
