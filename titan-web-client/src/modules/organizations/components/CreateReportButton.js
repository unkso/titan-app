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
import UsersService from 'titan/http/UsersService';
import { List } from 'titan/components/FileEntry/List';
import styled from 'styled-components';
import OrganizationsService from 'titan/http/OrganizationsService';
import { format as formatDate, startOfWeek, subDays } from 'date-fns';
import { withSnackbar } from 'notistack';

const EntryListColumn = styled.div`
  height: 380px;
  overflow: auto;
  padding-bottom: 8px;
`;

class CreateReportButtonComponent extends React.Component {
  constructor (props) {
    super(props);

    this.usersService = new UsersService();
    this.organizationsService = new OrganizationsService();
    this.state = {
      dialogOpen: false,
      fields: {
        comments: '',
        termStartDate: startOfWeek(new Date())
      },
      fileEntries: []
    };
  }

  componentDidMount () {
    // TODO Search file entries every time date changes.
    this.usersService.searchFileEntries({
      organizations: `${this.props.organization.id}`
    }).then(res => {
      this.setState({ fileEntries: res.data });
    });
  }

  openDialog () {
    this.setState({ dialogOpen: true });
  }

  closeDialog () {
    this.setState({ dialogOpen: false });
  }

  updateField (field, value) {
    this.setState({
      fields: { ...this.state.fields, [field]: value }
    });
  }

  isFormValid () {
    return !!this.state.fields.termStartDate &&
      !!this.state.fields.comments;
  }

  save () {
    this.organizationsService.saveReport(this.props.organization.id, {
      comments: this.state.fields.comments,
      term_start_date: formatDate(this.state.fields.termStartDate, "yyyy-MM-dd'T'00:00:00")
    }).then(res => {
      this.props.enqueueSnackbar('Report submitted', { variant: 'success' });
      this.closeDialog();
      this.props.onReportSaved(res.data);
    }).catch(() => {
      this.props.enqueueSnackbar('Unable to save report', {
        variant: 'error',
        action: (<Button size="small">Dismiss</Button>)
      });
    });
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
                  onFieldChange={(field, value) => this.updateField(field,
                    value)}
                />
              </Column>
              <Column basis="40%">
                <EntryListColumn>
                  <List items={this.state.fileEntries} />
                </EntryListColumn>
              </Column>
            </Row>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeDialog()}>Close</Button>
            <Button
              color="primary"
              disabled={!this.isFormValid()}
              onClick={() => this.save()}>Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

CreateReportButtonComponent.propsTypes = {
  onReportSaved: PropTypes.func,
  organization: PropTypes.object
};

export const CreateReportButton =
  withSnackbar(CreateReportButtonComponent);
