import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import Typography from '@material-ui/core/es/Typography/Typography';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import BorderedCard from 'titan/components/Card/BorderedCard';
import DialogTitle from '@material-ui/core/es/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/es/DialogContent/DialogContent';
import DialogContentText
  from '@material-ui/core/es/DialogContentText/DialogContentText';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
import DialogActions from '@material-ui/core/es/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTheme } from '@material-ui/core/styles';

export const FILE_ENTRY_A15 = 'A-15';
export const FILE_ENTRY_APP_DENIED = 'Application Denied';
export const FILE_ENTRY_APP_WITHDRAWN = 'Application Withdrawn';
export const FILE_ENTRY_AWARD = 'Award/Commendation';
export const FILE_ENTRY_AWOL = 'AWOL / NUA (Notice of Unauthorized Abscence)';
export const FILE_ENTRY_DEMOTION = 'Demotion';
export const FILE_ENTRY_DISCHARGE = 'Discharge';
export const FILE_ENTRY_BCT_E0_COMPLETE = 'E-0 BCT Complete';
export const FILE_ENTRY_BCT_E1_COMPLETE = 'E-1 BCT Complete';
export const FILE_ENTRY_BCT_E2_COMPLETE = 'E-2 BCT Complete';
export const FILE_ENTRY_BCT_E3_COMPLETE = 'E-3 BCT AIT Complete';
export const FILE_ENTRY_LOA = 'LOA';
export const FILE_ENTRY_MOS_QUALIFICATION = 'MOS Qualification';
export const FILE_ENTRY_NCO_ACADEMY_COMPLETE = 'NCO Academy Complete';
export const FILE_ENTRY_NCO_MEETING = 'NCO Meeting';
export const FILE_ENTRY_NOI = 'NOI: Notice of Inactivity';
export const FILE_ENTRY_PASS_JCS_INTERVIEW = 'Pass JCS Interview';
export const FILE_ENTRY_RETIRED = 'Retired';
export const FILE_ENTRY_TRANSFER = 'Transfer';

export const FILE_ENTRY_PROMOTION = 'Promotion';

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
          icon: <FontAwesomeIcon icon="ban" />
        };
      case FILE_ENTRY_AWARD:
        return {
          color: this.props.theme.palette.warning,
          icon: <FontAwesomeIcon icon="award" />
        };
      case FILE_ENTRY_APP_WITHDRAWN:
        return {
          color: this.props.theme.palette.info,
          icon: <FontAwesomeIcon icon="file-alt" />
        };
      case FILE_ENTRY_APP_DENIED:
        return {
          color: this.props.theme.palette.danger,
          icon: <FontAwesomeIcon icon="file-alt" />
        };
      case FILE_ENTRY_BCT_E0_COMPLETE:
      case FILE_ENTRY_BCT_E1_COMPLETE:
      case FILE_ENTRY_BCT_E2_COMPLETE:
      case FILE_ENTRY_BCT_E3_COMPLETE:
        return {
          color: this.props.theme.palette.success,
          icon: <FontAwesomeIcon icon="shield-alt" />
        };
      case FILE_ENTRY_PASS_JCS_INTERVIEW:
        return {
          color: this.props.theme.palette.success,
          icon: <FontAwesomeIcon icon="users" />
        };
      case FILE_ENTRY_PROMOTION:
        return {
          color: this.props.theme.palette.warning,
          icon: <FontAwesomeIcon icon="star" />
        };
      case FILE_ENTRY_TRANSFER:
        return {
          color: this.props.theme.palette.info,
          icon: <FontAwesomeIcon icon="random" />
        };
      default:
        return {
          color: this.props.theme.palette.info,
          icon: <FontAwesomeIcon icon="info" />
        };
    }
  }

  render () {
    const theme = this.getFileEntryTheme(this.props.type);
    const date = (new Date(this.props.date)).toLocaleDateString();

    return (
      <React.Fragment>
        <BorderedCard
          highlightLeft={theme.color}
          onClick={this.openDialogHandler}>
          <ListItem>
            <Typography style={{ color: theme.color }}>{theme.icon}</Typography>
            <ListItemText>
              <Typography variant="subtitle1" color="textSecondary">{date}</Typography>
              <Typography variant="body1">{this.props.type}</Typography>
            </ListItemText>
          </ListItem>
        </BorderedCard>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>{this.props.type}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.children}</DialogContentText>
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
  type: PropTypes.string,
  date: PropTypes.string
};

export default withTheme()(FileEntry);
