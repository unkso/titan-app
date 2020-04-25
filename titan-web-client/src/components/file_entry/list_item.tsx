import React, { useEffect, useState } from 'react';
import MatListItem from '@material-ui/core/ListItem/ListItem';
import Typography from '@material-ui/core/Typography/Typography';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import BorderedCard from '../card/bordered_card';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText
  from '@material-ui/core/DialogContentText/DialogContentText';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import { useTheme, withTheme } from '@material-ui/core/styles';
import Row from '../grid/row';
import Column from '../grid/column';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { getFileEntryTheme } from '@titan/components/file_entry/index';
import { FileEntryPropType } from '@titan/models';
import {UserFileEntryWithAssoc} from "@titan/http/api";
import {Card} from "@material-ui/core";

interface FileEntryListItemProps {
  fileEntry: UserFileEntryWithAssoc;
}

export function FileEntryListItem(props: FileEntryListItemProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const theme = useTheme();
  const [fileEntryTheme, setFileEntryTheme] = useState();
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    setStartDate((new Date(
        props.fileEntry.startDate)).toLocaleDateString());
    setFileEntryTheme(getFileEntryTheme(props.fileEntry.fileEntryType.name, theme));
  }, [props.fileEntry, theme]);

  if (!fileEntryTheme) {
    return null;
  }

  return (
      <React.Fragment>
        <Card onClick={openDialog}>
          <MatListItem>
            <Typography style={{ color: fileEntryTheme.color, marginRight: 16 }}>
              <i className={`fas fa-${fileEntryTheme.icon}`} />
            </Typography>
            <ListItemText>{props.fileEntry.fileEntryType.name}</ListItemText>
          </MatListItem>
        </Card>
        <Dialog open={dialogOpen} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Row>
              <Column>{props.fileEntry.fileEntryType.name}</Column>
              <Column grow={1}>
                <Typography
                    align="right"
                    component="div"
                    variant="body1">
                  <Chip
                      avatar={(
                          <Avatar src={
                            props.fileEntry.modifiedBy.wcf.avatarUrl}
                          />
                      )}
                      component="a"
                      href={`/roster/${props.fileEntry.modifiedBy.id}`}
                      label={props.fileEntry.modifiedBy.username}
                      clickable
                  />
                </Typography>
              </Column>
            </Row>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="body2">{props.fileEntry.comments}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
}
