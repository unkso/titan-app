import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Typography from '@material-ui/core/Typography/Typography';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import BorderedCard from '@titan/components/card/bordered_card';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText
  from '@material-ui/core/DialogContentText/DialogContentText';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import { withTheme } from '@material-ui/core/styles';
import {
  FILE_ENTRY_A15,
  FILE_ENTRY_APP_DENIED,
  FILE_ENTRY_APP_WITHDRAWN,
  FILE_ENTRY_AWARD, FILE_ENTRY_AWOL,
  FILE_ENTRY_BCT_E0_COMPLETE,
  FILE_ENTRY_BCT_E1_COMPLETE,
  FILE_ENTRY_BCT_E2_COMPLETE,
  FILE_ENTRY_BCT_E3_COMPLETE,
  FILE_ENTRY_PASS_JCS_INTERVIEW,
  FILE_ENTRY_PROMOTION,
  FILE_ENTRY_TRANSFER
} from '@titan/modules/roster/constants';
import Row from '@titan/components/grid/row';
import Column from '@titan/components/grid/column';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

class FileEntry extends React.Component {
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

  getFileEntryTheme (type) {
    switch (type) {
      case FILE_ENTRY_A15:
        return {
          color: this.props.theme.palette.danger,
          icon: <span className="fas fa-ban" />
        };
      case FILE_ENTRY_AWOL:
        return {
          color: this.props.theme.palette.danger,
          icon: <span className="fas fa-info" />
        };
      case FILE_ENTRY_AWARD:
        return {
          color: this.props.theme.palette.warning,
          icon: <span className="fas fa-award" />
        };
      case FILE_ENTRY_APP_WITHDRAWN:
        return {
          color: this.props.theme.palette.info,
          icon: <span className="fas fa-file-alt" />
        };
      case FILE_ENTRY_APP_DENIED:
        return {
          color: this.props.theme.palette.danger,
          icon: <span className="fas fa-file-alt" />
        };
      case FILE_ENTRY_BCT_E0_COMPLETE:
      case FILE_ENTRY_BCT_E1_COMPLETE:
      case FILE_ENTRY_BCT_E2_COMPLETE:
      case FILE_ENTRY_BCT_E3_COMPLETE:
        return {
          color: this.props.theme.palette.success,
          icon: <span className="fas fa-shield-alt" />
        };
      case FILE_ENTRY_PASS_JCS_INTERVIEW:
        return {
          color: this.props.theme.palette.success,
          icon: <span className="fas fa-users" />
        };
      case FILE_ENTRY_PROMOTION:
        return {
          color: this.props.theme.palette.warning,
          icon: <span className="fas fa-star" />
        };
      case FILE_ENTRY_TRANSFER:
        return {
          color: this.props.theme.palette.info,
          icon: <span className="fas fa-random" />
        };
      default:
        return {
          color: this.props.theme.palette.info,
          icon: <span className="fas fa-info" />
        };
    }
  }

  render () {
    const theme = this.getFileEntryTheme(
      this.props.entry.file_entry_type.name);
    const date = (new Date(
      this.props.entry.start_date)).toLocaleDateString();

    return (
      <React.Fragment>
        <BorderedCard
          highlightLeft={theme.color}
          onClick={this.openDialogHandler}>
          <ListItem>
            <Typography style={{ color: theme.color }}>
              {theme.icon}
            </Typography>
            <ListItemText>
              <Typography variant="body1" color="textSecondary">
                {date}
              </Typography>
              <Typography variant="subtitle1">
                {this.props.entry.file_entry_type.name}
              </Typography>
            </ListItemText>
          </ListItem>
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
                      <Avatar src={this.props.entry.modified_by.wcf.avatar_url} />
                    )}
                    clickable
                    component="a"
                    href={`/roster/${this.props.entry.modified_by.id}`}
                    label={`${this.props.entry.modified_by.username}`}
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

FileEntry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number,
    file_entry_type: PropTypes.object,
    user_profile: PropTypes.object,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    comments: PropTypes.string,
    date_modified: PropTypes.string,
    modified_by: PropTypes.object
  })
};

export default withTheme()(FileEntry);
