import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import { format as formatDate } from 'date-fns';
import { CreateEventExcuseForm }
  from '@titan/modules/roster/components/excuse/create_event_excuse_form';
import {useSnackbar} from 'notistack';
import {useAcl} from '@titan/lib/acl';
import {Permission} from '@titan/lib/acl/permissions';
import {
  EventType, SaveUserExcuseFields,
  TitanApiClient, UserEventExcuseWithAssoc,
  UserProfile
} from '@titan/http/api';
import {useDispatch, useSelector} from "react-redux";
import {
  UserProfileActions, userProfileEventExcusesSelector,
  userProfileUserSelector
} from "@titan/store/profile";
import {AppState} from "@titan/store/root_reducer";
import {assert} from "@titan/lib/assert";

export function CreateEventExcuseContainer() {
  const user = useSelector<AppState, UserProfile>(userProfileUserSelector);
  const excuses = useSelector<AppState, UserEventExcuseWithAssoc[]>(userProfileEventExcusesSelector);
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const [formFields, setFormFields] = useState({
    eventDate: new Date(),
    eventTypeId: '',
    comments: '',
  });
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const canCreateEventExcuse = useAcl(acl =>
    acl.newBuilder()
        .hasAclPermissions([
            Permission.CAN_ACK_EVENT_EXCUSE,
            Permission.CAN_CREATE_EVENT_EXCUSE
        ])
        .or(acl.isAuthenticatedUser(user.id))
        .build());
  const handleFormFieldChange = (field, value) => {
    const values = {...formFields};
    switch (field) {
      case 'comments':
        values.comments = value;
        break;
      case 'eventDate':
        values.eventDate = value;
        break;
      case 'eventTypeId':
        values.eventTypeId = value;
        break;
      default:
        break;
    }

    setFormFields(values);
  };

  useEffect(() => {
    TitanApiClient.getEventTypes().subscribe(eventTypes => {
      setEventTypes(eventTypes);
    });
  }, []);

  function saveExcuse() {
    const payload: SaveUserExcuseFields = {
      comments: formFields.comments,
      eventTypeId: assert(formFields.eventTypeId) as unknown as number,
      eventDate: formatDate(formFields.eventDate as Date, "yyyy-MM-dd'T'00:00:00"),
    };

    TitanApiClient.saveUserExcuse({userId: user.id, saveUserExcuseFields: payload})
        .subscribe(savedExcuse => {
          setDialogOpen(false);
          snackbar.enqueueSnackbar('excuse added', {variant: 'success'});

          const updatedExcuses = Array.from(excuses);
          updatedExcuses.push(savedExcuse);
          updatedExcuses.sort(
              (x, y) => x.eventDate < y.eventDate ? 1 : -1);
          dispatch(UserProfileActions.setEventExcuses(updatedExcuses));
        }, () => {
          snackbar.enqueueSnackbar('Unable to add excuse', {
            variant: 'error',
            action: (<Button size="small">Dismiss</Button>)
          });
        });
  }

  function isFormValid() {
    return formFields.comments.length > 0
        && formFields.eventDate
        && formFields.eventTypeId;
  }

  return (
      <React.Fragment>
        {canCreateEventExcuse &&
          <Button
            color="primary"
            size="small"
            onClick={openDialog}>Add excuse</Button>
        }
        <Dialog open={dialogOpen} fullWidth>
          <DialogTitle>Add Event Excuse</DialogTitle>
          <DialogContent>
            <CreateEventExcuseForm
                eventTypes={eventTypes}
                fields={formFields}
                onFieldChange={handleFormFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Close</Button>
            <Button
                color="primary"
                onClick={() => saveExcuse()}
                disabled={!isFormValid()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
}
