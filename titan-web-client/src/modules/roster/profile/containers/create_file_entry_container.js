import React, { useEffect, useState } from 'react';
import * as profileActions from '@titan/actions/profile_actions';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import { format as formatDate } from 'date-fns';
import { MULTI_DATE_FILE_ENTRY_TYPES } from '@titan/components/file_entry/constants';
import CreateForm from '@titan/components/file_entry/create_form';
import { useDispatch, useSelector } from 'react-redux';
import { ListFileEntryTypes, makeTitanApiRequest } from '@titan/http/api_client';
import * as fileEntryActions from '@titan/actions/file_entry_actions';
import { PERMISSION_CAN_CREATE_FILE_ENTRIES } from '@titan/acl_rules';
import { useAcl } from '@titan/hooks/acl';

export function CreateFileEntryContainer () {
  const dispatch = useDispatch();
  const fileEntryTypes = useSelector(
    state => state.roster.fileEntries.types);
  const profileUserId = useSelector(
    state => state.roster.profile.user.id);
  const canCreateFileEntries = useAcl(acl =>
    acl.hasAclPermission(PERMISSION_CAN_CREATE_FILE_ENTRIES));
  const [open, setOpen] = useState(false);
  const [formFields, setFormFields] = useState({
    fileEntryTypeIndex: -1
  });

  useEffect(() => {
    if (!fileEntryTypes) {
      makeTitanApiRequest(ListFileEntryTypes)
        .then(res => {
          dispatch(fileEntryActions.setTypes(res.data));
        });
    }
  }, [fileEntryTypes]);

  function saveFileEntry () {
    let endDate = formFields.startDate;
    if (isSelectedFileTypeMultiDate()) {
      endDate = formFields.endDate;
    }

    const entryType = fileEntryTypes[formFields.fileEntryTypeIndex];
    const payload = {
      file_entry_type_id: entryType.id,
      start_date: formatDate(formFields.startDate, "yyyy-MM-dd'T'00:00:00"),
      end_date: formatDate(endDate, "yyyy-MM-dd'T'00:00:00"),
      comments: formFields.comments
    };

    this.usersService.saveUserFileEntry(profileUserId, payload)
      .then((res) => {
        dispatch(profileActions.addFileEntry(res.data.file_entry));
        setOpen(false);
      })
      .catch(() => {
        // TODO indicate error in UI
        console.warn('Failed to save file entry.');
      });
  }

  function updateField (field, value) {
    setFormFields({ ...formFields, [field]: value });
  }

  function isSelectedFileTypeMultiDate () {
    if (formFields.fileEntryTypeIndex === -1) {
      return false;
    }

    const entryType = fileEntryTypes[formFields.fileEntryTypeIndex];
    return MULTI_DATE_FILE_ENTRY_TYPES.indexOf(entryType.name) !== -1;
  }

  function isFormValid () {
    return formFields.startDate &&
        (!isSelectedFileTypeMultiDate() || formFields.endDate) &&
      formFields.fileEntryTypeIndex !== -1;
  }

  return (
    <React.Fragment>
      {canCreateFileEntries &&
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}>Add Entry</Button>
      }
      <Dialog open={open} fullWidth>
        <DialogTitle>Add File Entry</DialogTitle>
        <DialogContent>
          <CreateForm
            multiDate={isSelectedFileTypeMultiDate()}
            entryTypes={fileEntryTypes || []}
            fields={formFields}
            onFieldChange={(field, value) => updateField(field, value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            color="primary"
            onClick={() => saveFileEntry()}
            disabled={!isFormValid()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
