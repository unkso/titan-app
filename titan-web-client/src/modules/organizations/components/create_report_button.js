import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Create_report_form } from '@titan/modules/organizations/components/create_report_form';
import Row from '@titan/components/grid/row';
import Column from '@titan/components/grid/column';
import { List } from '@titan/components/file_entry/list';
import styled from 'styled-components';
import OrganizationsService from '@titan/http/OrganizationsService';
import { format as formatDate, startOfWeek, endOfWeek } from 'date-fns';
import { withSnackbar } from 'notistack';
import {
  EmptyStateWrapper,
  Icon_empty_state
} from '@titan/components/empty_state/icon_empty_state';

const EntryListColumn = styled.div`
  height: 380px;
  overflow: auto;
  padding-bottom: 8px;
  
  ${EmptyStateWrapper} {
    margin-top: 150px;
  }
`;

class CreateReportButtonComponent extends React.Component {
  constructor (props) {
    super(props);

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
    this.updateFileEntriesList();
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevState.fields.termStartDate !== this.state.fields.termStartDate) {
      this.updateFileEntriesList();
    }
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

  updateFileEntriesList () {
    this.organizationsService.findFileEntries({
      organizations: `${this.props.organization.id}`,
      from_start_date: formatDate(startOfWeek(this.state.fields.termStartDate), "yyyy-MM-dd'T'00:00:00"),
      to_start_date: formatDate(endOfWeek(this.state.fields.termStartDate), "yyyy-MM-dd'T'00:00:00")
    }).then(res => {
      this.setState({ fileEntries: res.data });
    });
  }

  save () {
    this.organizationsService.saveReport(this.props.organization.id, {
      comments: this.state.fields.comments,
      term_start_date: formatDate(this.state.fields.termStartDate, "yyyy-MM-dd'T'00:00:00")
    }).then(res => {
      this.props.enqueueSnackbar('Report submitted', { variant: 'success' });
      this.props.onReportSaved(res.data);
      this.closeDialog();
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
                <Create_report_form
                  fields={this.state.fields}
                  onFieldChange={(field, value) => this.updateField(field,
                    value)}
                />
              </Column>
              <Column basis="40%">
                <EntryListColumn>
                  {this.state.fileEntries.length > 0
                    ? <List items={this.state.fileEntries} />
                    : <Icon_empty_state icon="file-alt" primaryText="No related file entries" />
                  }
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
