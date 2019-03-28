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
} from '../../constants';
import { AckEventExcuseButton }
  from './AckEventExcuseButton';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import {
  Divider,
  ListItemAvatar
} from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import Row from 'titan/components/Grid/Row';
import Column from 'titan/components/Grid/Column';
import Tooltip from '@material-ui/core/Tooltip';
import { WithAcl } from 'titan/components/Acl/WithAcl';

class EventExcuseListItemComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      dialogOpen: false,
      ack_user: null,
      ack_date: null
    };

    this.ackHandler = this.onAck.bind(this);
    this.closeDialogHandler = this.closeDialog.bind(this);
    this.openDialogHandler = this.openDialog.bind(this);
  }

  componentDidMount () {
    if (this.props.excuse.ack_user) {
      this.setState({
        ack_date: new Date(this.props.excuse.ack_date).toLocaleDateString(),
        ack_user: this.props.excuse.ack_user
      });
    }
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

  onAck (excuse) {
    this.closeDialogHandler();
    this.setState({
      ack_date: new Date(excuse.ack_date).toLocaleDateString(),
      ack_user: excuse.ack_user
    });
  }

  render () {
    const theme = this.getEventExcuseListItemTheme(this.props.type);
    const eventDate = (new Date(this.props.excuse.event_date)).toLocaleDateString();
    const submissionDate = (new Date(this.props.excuse.date_created)).toLocaleDateString();

    return (
      <React.Fragment>
        <BorderedCard
          highlightLeft={theme.color}
          onClick={this.openDialogHandler}>
          <List>
            <ListItem>
              <Typography style={{ color: theme.color, marginRight: 16 }}>{theme.icon}</Typography>
              <ListItemText>
                <Typography variant="body1" color="textSecondary">{eventDate} | {this.props.excuse.user.username}</Typography>
                <Typography variant="subtitle1">{this.props.type}</Typography>
              </ListItemText>
              <ListItemText>
                {this.state.ack_user && (
                  <Typography align="right">
                    <Tooltip title={`Ack by ${this.state.ack_user.username}`}>
                      <span>
                        <FontAwesomeIcon
                          icon="check"
                          color={this.props.theme.palette.success} />
                      </span>
                    </Tooltip>
                  </Typography>
                )}
              </ListItemText>
            </ListItem>
          </List>
        </BorderedCard>
        <Dialog open={this.state.dialogOpen} maxWidth="md" fullWidth>
          <DialogTitle>
            <span>Excuse for {this.props.excuse.event_type.name}</span>
            <Typography variant="body1" color="textSecondary">{eventDate}</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.children}</DialogContentText>
          </DialogContent>
          <Divider />
          <DialogContent>
            <Row>
              <Column grow={1}>
                <List subheader={<ListSubheader>Submitted by ({submissionDate})</ListSubheader>}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={this.props.excuse.user.wcf.avatar_url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={this.props.excuse.user.username}
                    />
                  </ListItem>
                </List>
              </Column>
              <Column grow={1}>
                {this.state.ack_user &&
                  <List subheader={<ListSubheader>Acknowledged by ({this.state.ack_date})</ListSubheader>}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={this.state.ack_user.wcf.avatar_url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={this.state.ack_user.username}
                      />
                    </ListItem>
                  </List>
                }
              </Column>
            </Row>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialogHandler}>Close</Button>
            {!this.state.ack_user &&
              <WithAcl
                options={['mod.titan:canAckEventExcuse']}>
                <AckEventExcuseButton
                  excuseId={this.props.excuse.id}
                  onAck={this.ackHandler}
                />
              </WithAcl>
            }
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

EventExcuseListItemComponent.propTypes = {
  excuse: PropTypes.shape({
    id: PropTypes.number,
    ack_user: PropTypes.object,
    ack_date: PropTypes.string,
    user: PropTypes.object,
    event_type: PropTypes.object
  })
};

export const EventExcuseListItem =
    withTheme(EventExcuseListItemComponent);
