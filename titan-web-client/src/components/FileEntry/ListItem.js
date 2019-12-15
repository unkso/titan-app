import React from 'react';
import MatListItem from '@material-ui/core/ListItem/ListItem';
import Typography from '@material-ui/core/Typography/Typography';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import BorderedCard from '../Card/BorderedCard';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText
  from '@material-ui/core/DialogContentText/DialogContentText';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import { withTheme } from '@material-ui/core/styles';
import Row from '../Grid/Row';
import Column from '../Grid/Column';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { getFileEntryTheme } from '@titan/components/FileEntry/index';
import { FileEntryPropType } from '@titan/models';

class ListItemComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = { dialogOpen: false };
    this.openDialogHandler = this.openDialog.bind(this);
    this.closeDialogHandler = this.closeDialog.bind(this);
  }

  openDialog () {
    this.setState({ dialogOpen: true });
  }

  closeDialog () {
    this.setState({ dialogOpen: false });
  }

  render () {
    const theme = getFileEntryTheme(
      this.props.entry.file_entry_type.name, this.props.theme);
    const date = (new Date(
      this.props.entry.start_date)).toLocaleDateString();

    return (
      <React.Fragment>
        <BorderedCard
          highlightLeft={theme.color}
          onClick={this.openDialogHandler}>
          <MatListItem>
            <Typography style={{ color: theme.color, marginRight: 16 }}>
              <span className={`fas fa-${theme.icon}`} />
            </Typography>
            <ListItemText>
              <Typography variant="body1" color="textSecondary">
                {date}
              </Typography>
              <Typography variant="subtitle1">
                {this.props.entry.file_entry_type.name}
              </Typography>
            </ListItemText>
          </MatListItem>
        </BorderedCard>
        <Dialog open={this.state.dialogOpen} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Row>
              <Column>{this.props.entry.file_entry_type.name}</Column>
              <Column grow={1}>
                <Typography
                  align="right"
                  component="div"
                  variant="body1">
                  <Chip
                    avatar={(
                      <Avatar src={
                        this.props.entry.modified_by.wcf.avatar_url}
                      />
                    )}
                    component="a"
                    href={`/roster/${this.props.entry.modified_by.id}`}
                    label={this.props.entry.modified_by.username}
                    clickable
                  />
                </Typography>
              </Column>
            </Row>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="body2">{this.props.entry.comments}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialogHandler}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

ListItemComponent.propTypes = {
  entry: FileEntryPropType
};

export const ListItem = withTheme(ListItemComponent);
