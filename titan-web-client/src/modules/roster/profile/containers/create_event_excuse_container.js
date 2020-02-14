import React from 'react';
import { bindActionCreators } from 'redux';
import * as profileActions from '@titan/actions/profile_actions';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import UsersService from '@titan/http/UsersService';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import { format as formatDate } from 'date-fns';
import { CreateEventExcuseForm }
  from '@titan/modules/roster/components/excuse/create_event_excuse_form';
import EventsService from '@titan/http/EventsService';
import { withSnackbar } from 'notistack';
import { createAclInstanceFromSession } from '@titan/lib/acl';
import {Permission} from '@titan/lib/acl/permissions';

class CreateEventExcuseContainer extends React.Component {
  constructor (props) {
    super(props);

    this.usersService = new UsersService();
    this.eventsService = new EventsService();
    this.state = {
      open: false,
      eventDate: null,
      eventTypeId: '',
      comments: '',
      eventTypes: []
    };

    this.openDialogHandler = () => this.setState({ open: true });
    this.closeDialogHandler = () => this.setState({ open: false });
    this.fieldChangeHandler = this.updateField.bind(this);
    this.saveHandler = this.saveExcuse.bind(this);
  }

  componentDidMount () {
    this.eventsService.listEventTypes()
      .then((res) => {
        this.setState({ eventTypes: res.data });
      });
  }

  saveExcuse () {
    const payload = {
      event_type_id: this.state.eventTypeId,
      event_date: formatDate(this.state.eventDate, "yyyy-MM-dd'T'00:00:00"),
      comments: this.state.comments
    };

    this.usersService.saveUserEventExcuse(this.props.profile.user.id, payload)
      .then((res) => {
        this.props.actions.profile.addExcuse(res.data);
        this.setState({ open: false });
        this.props.enqueueSnackbar('excuse added', { variant: 'success' });
      })
      .catch(() => {
        this.props.enqueueSnackbar('Unable to add excuse', {
          variant: 'error',
          action: (<Button size="small">Dismiss</Button>)
        });
      });
  }

  updateField (field, value) {
    this.setState({ [field]: value });
  }

  isFormValid () {
    return this.state.comments.length > 0 && this.state.eventDate &&
        this.state.eventTypeId;
  }

  render () {
    const acl = createAclInstanceFromSession(this.props.session);
    const canCreateEventExcuse = acl.newBuilder()
      .hasAclPermissions([Permission.CAN_ACK_EVENT_EXCUSE, Permission.CAN_CREATE_EVENT_EXCUSE])
      .or(acl.isAuthenticatedUser(this.props.profile.user.id));

    return (
      <React.Fragment>
        {canCreateEventExcuse &&
        <Button
          variant="contained"
          color="primary"
          onClick={this.openDialogHandler}>Add Excuse</Button>
        }
        <Dialog open={this.state.open} fullWidth>
          <DialogTitle>Add Event Excuse</DialogTitle>
          <DialogContent>
            <CreateEventExcuseForm
              eventTypes={this.state.eventTypes}
              fields={this.state}
              onFieldChange={this.fieldChangeHandler}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialogHandler}>Close</Button>
            <Button
              color="primary"
              onClick={this.saveHandler}
              disabled={!this.isFormValid()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

function mapStateToProps (state) {
  return {
    session: state.auth.session,
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

export default withSnackbar(connect(mapStateToProps, mapActionsToProps)(
  CreateEventExcuseContainer
));
