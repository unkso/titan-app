import React from 'react';
import { bindActionCreators } from 'redux';
import * as profileActions from 'titan/actions/profileActions';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import UsersService from 'titan/http/UsersService';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import { format as formatDate } from 'date-fns';
import CreateFileEntryForm
  from 'titan/modules/roster/profile/components/CreateFileEntryForm';
import { MULTI_DATE_FILE_ENTRY_TYPES } from 'titan/modules/roster/constants';
import WithAcl from 'titan/components/Acl/WithAcl';

class CreateFileEntryContainer extends React.Component {
  constructor (props) {
    super(props);

    this.usersService = new UsersService();
    this.state = {
      open: false,
      fileEntryTypes: [],
      fileEntryTypeIndex: -1,
      comments: '',
      startDate: null,
      endDate: null
    };

    this.openDialogHandler = () => this.setState({ open: true });
    this.closeDialogHandler = () => this.setState({ open: false });
    this.fieldChangeHandler = this.updateField.bind(this);
    this.saveFileEntryHandler = this.saveFileEntry.bind(this);
  }

  componentDidMount () {
    this.usersService.listUserFileEntryTypes()
      .then((res) => {
        this.setState({ fileEntryTypes: res.data });
      });
  }

  saveFileEntry () {
    let endDate = this.state.startDate;
    if (this.isSelectedFileTypeMultiDate()) {
      endDate = this.state.endDate;
    }

    const entryType = this.state.fileEntryTypes[this.state.fileEntryTypeIndex];
    const payload = {
      file_entry_type_id: entryType.id,
      start_date: formatDate(this.state.startDate, "yyyy-MM-dd'T'00:00:00"),
      end_date: formatDate(endDate, "yyyy-MM-dd'T'00:00:00"),
      comments: this.state.comments
    };

    this.usersService.saveUserFileEntry(this.props.profile.user.id, payload)
      .then((res) => {
        this.props.actions.profile.addFileEntry(res.data.file_entry);
        this.setState({ open: false });
      })
      .catch(() => {
        // TODO indicate error in UI
        console.warn('Failed to save file entry.');
      });
  }

  updateField (field, value) {
    this.setState({ [field]: value });
  }

  isSelectedFileTypeMultiDate () {
    if (this.state.fileEntryTypeIndex === -1) {
      return false;
    }

    const entryType = this.state.fileEntryTypes[this.state.fileEntryTypeIndex];
    return MULTI_DATE_FILE_ENTRY_TYPES.indexOf(entryType.name) !== -1;
  }

  isFormValid () {
    return this.state.startDate &&
        (!this.isSelectedFileTypeMultiDate() || this.state.endDate) &&
        this.state.fileEntryTypeIndex !== -1;
  }

  render () {
    return (
      <React.Fragment>
        <WithAcl options={['titan.user:canCreateFileEntry']}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.openDialogHandler}>Add Entry</Button>
        </WithAcl>

        <Dialog open={this.state.open} fullWidth>
          <DialogTitle>Add File Entry</DialogTitle>
          <DialogContent>
            <CreateFileEntryForm
              multiDate={this.isSelectedFileTypeMultiDate()}
              entryTypes={this.state.fileEntryTypes}
              fields={this.state}
              onFieldChange={this.fieldChangeHandler}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialogHandler}>Close</Button>
            <Button
              color="primary"
              onClick={this.saveFileEntryHandler}
              disabled={!this.isFormValid()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

function mapStateToProps (state) {
  return {
    profile: state.roster.profile
  };
}

function mapActionsToProps (dispatch) {
  return {
    actions: {
      profile: bindActionCreators(profileActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapActionsToProps)(
  CreateFileEntryContainer
);
