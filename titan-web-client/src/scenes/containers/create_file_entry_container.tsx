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
import { Permission, useAcl} from '@titan/lib/acl';
import {
  SaveFileEntryFields,
  TitanApiClient,
  UserFileEntryType, UserFileEntryWithAssoc
} from "../../http/api";
import {
  UserProfileActions,
  userProfileFileEntriesSelector,
  userProfileUserSelector
} from "../../store/profile";
import {useSnackbar} from "notistack";
import {AppState} from "@titan/store/root_reducer";

export function CreateFileEntryContainer () {
  const dispatch = useDispatch();
  const user = useSelector(userProfileUserSelector);
  const fileEntries = useSelector<AppState, UserFileEntryWithAssoc[]>(userProfileFileEntriesSelector);
  const [fileEntryTypes, setFileEntryTypes] = useState<UserFileEntryType[]>([]);
  const canCreateFileEntries = useAcl(acl =>
    acl.hasAclPermission(Permission.CAN_CREATE_FILE_ENTRIES));
  const [open, setOpen] = useState(false);
  const snackbar = useSnackbar();
  const [formFields, setFormFields] = useState({
    comments: '',
    endDate: new Date(),
    fileEntryTypeIndex: -1,
    startDate: new Date(),
  });

  useEffect(() => {
    TitanApiClient.getUsersFileEntryTypes()
        .subscribe(types => {
          setFileEntryTypes(types);
        });
  }, [user]);

  const saveFileEntryHandler = () => {
    let endDate = formFields.startDate;
    if (isSelectedFileTypeMultiDate()) {
      endDate = formFields.endDate;
    }

    const entryType = fileEntryTypes[formFields.fileEntryTypeIndex];
    const payload: SaveFileEntryFields = {
      comments: formFields.comments,
      endDate: formatDate(endDate, "yyyy-MM-dd'T'00:00:00"),
      fileEntryTypeId: entryType.id!,
      startDate: formatDate(formFields.startDate, "yyyy-MM-dd'T'00:00:00"),
    };

    TitanApiClient.saveUserFileEntry({userId: user.id, saveFileEntryFields: payload})
        .subscribe(savedFileEntry => {
          const updatedFileEntries = Array.from(fileEntries);
          updatedFileEntries.push(savedFileEntry);
          updatedFileEntries.sort(
              (x, y) => x.startDate < y.startDate ? 1 : -1);
          dispatch(UserProfileActions.setFileEntries(updatedFileEntries));
          setOpen(false);
        }, () => {
          snackbar.enqueueSnackbar('Unable to save file entry', {
            variant: 'error'
          });
        });
  }

  function updateField (field, value) {
    setFormFields({ ...formFields, [field]: value });
  }

  function isSelectedFileTypeMultiDate () {
    if (formFields.fileEntryTypeIndex === -1) {
      return false;
    }

    const entryType = fileEntryTypes[formFields.fileEntryTypeIndex]!;
    return MULTI_DATE_FILE_ENTRY_TYPES.indexOf(entryType.name) !== -1;
  }

  function isFormValid () {
    return formFields.startDate &&
        (!isSelectedFileTypeMultiDate() || formFields.endDate) &&
      formFields.fileEntryTypeIndex !== -1;
  }

  return (
    <React.Fragment>
      <Button
        color="primary"
        size="small"
        onClick={() => setOpen(true)}>Add Entry</Button>
      <Dialog open={open} fullWidth>
        <DialogTitle>Add File Entry</DialogTitle>
        <DialogContent>
          <CreateForm
            multiDate={isSelectedFileTypeMultiDate()}
            entryTypes={fileEntryTypes}
            fields={formFields}
            onFieldChange={(field, value) => updateField(field, value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            color="primary"
            onClick={saveFileEntryHandler}
            disabled={!isFormValid()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
