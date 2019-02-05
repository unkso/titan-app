import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Typography from '@material-ui/core/Typography/Typography';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import BorderedCard from 'titan/components/Card/BorderedCard';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText
  from '@material-ui/core/DialogContentText/DialogContentText';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTheme } from '@material-ui/core/styles';
import {
  EVENT_TYPE_MEETING,
  EVENT_TYPE_NCO_MEETING,
  EVENT_TYPE_PRACTICE,
  EVENT_TYPE_SCRIM,
  EVENT_TYPE_TRAINING
} from 'titan/modules/roster/constants';

class EventExcuseListItem extends React.Component {
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

  getEventExcuseListItemTheme (type) {
    switch (type) {
      case EVENT_TYPE_MEETING:
        return {
          color: this.props.theme.palette.secondary.light,
          icon: <FontAwesomeIcon icon="users" />
        };
      case EVENT_TYPE_NCO_MEETING:
        return {
          color: this.props.theme.palette.secondary.light,
          icon: <FontAwesomeIcon icon="users" />
        };
      case EVENT_TYPE_PRACTICE:
        return {
          color: this.props.theme.palette.secondary.light,
          icon: <FontAwesomeIcon icon="gamepad" />
        };
      case EVENT_TYPE_SCRIM:
        return {
          color: this.props.theme.palette.primary.light,
          icon: <FontAwesomeIcon icon="shield-alt" />
        };
      case EVENT_TYPE_TRAINING:
        return {
          color: this.props.theme.palette.secondary.light,
          icon: <FontAwesomeIcon icon="dumbbell" />
        };
      default:
        return {
          color: this.props.theme.palette.secondary.light,
          icon: <FontAwesomeIcon icon="info" />
        };
    }
  }

  render () {
    const theme = this.getEventExcuseListItemTheme(this.props.type);
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
        <Dialog open={this.state.dialogOpen} maxWidth="sm" fullWidth>
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

EventExcuseListItem.propTypes = {
  type: PropTypes.string,
  date: PropTypes.string
};

export default withTheme()(EventExcuseListItem);
