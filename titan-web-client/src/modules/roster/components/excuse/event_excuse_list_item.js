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
  EVENT_TYPE_MEETING,
  EVENT_TYPE_NCO_MEETING,
  EVENT_TYPE_PRACTICE,
  EVENT_TYPE_SCRIM,
  EVENT_TYPE_TRAINING
} from '../../constants';
import { AckEventExcuseButton }
  from './ack_event_excuse_button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Row from '@titan/components/grid/row';
import Column from '@titan/components/grid/column';
import Tooltip from '@material-ui/core/Tooltip';
import { WithAcl } from '@titan/components/acl/with_acl';
import Chip from '@material-ui/core/Chip';
import styled from 'styled-components';

/** TODO Move to a dedicated component with theme variants. */
const Callout = styled.div`
    background: #f0f0f0;
    border-radius: 4px;
`;

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
          icon: <span className="fas fa-users" />
        };
      case EVENT_TYPE_NCO_MEETING:
        return {
          color: this.props.theme.palette.secondary.light,
          icon: <span className="fas fa-users" />
        };
      case EVENT_TYPE_PRACTICE:
        return {
          color: this.props.theme.palette.secondary.light,
          icon: <span className="fas fa-gamepad" />
        };
      case EVENT_TYPE_SCRIM:
        return {
          color: this.props.theme.palette.primary.light,
          icon: <span className="fas fa-shield-alt" />
        };
      case EVENT_TYPE_TRAINING:
        return {
          color: this.props.theme.palette.secondary.light,
          icon: <span className="fas fa-dumbbell" />
        };
      default:
        return {
          color: this.props.theme.palette.secondary.light,
          icon: <span className="fas fa-info" />
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
                      <span
                        className="fas fa-check"
                        style={{ color: this.props.theme.palette.success }}
                      />
                    </Tooltip>
                  </Typography>
                )}
              </ListItemText>
            </ListItem>
          </List>
        </BorderedCard>
        <Dialog open={this.state.dialogOpen} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Row>
              <Column>
                <span>Excuse for {this.props.excuse.event_type.name}</span>
                <Typography variant="body1" color="textSecondary">{eventDate}</Typography>
              </Column>
              <Column grow={1}>
                <Typography
                  align="right"
                  component="div"
                  variant="body1">
                  <Chip
                    avatar={(
                      <Avatar src={
                        this.props.excuse.user.wcf.avatar_url}
                      />
                    )}
                    component="a"
                    href={`/roster/${this.props.excuse.user.id}`}
                    label={this.props.excuse.user.username}
                    clickable
                  />
                </Typography>
              </Column>
            </Row>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Callout>
                <Row alignItems="center">
                  <Column grow={1}>
                    <Typography variant="subtitle2" element="span">
                      <b>Created:</b> {submissionDate}</Typography>
                  </Column>
                  {this.state.ack_date && (
                    <React.Fragment>
                      <Column>
                        <Typography variant="subtitle2" element="span">
                          <span><b>Ack:</b> {this.state.ack_date} by </span>
                          <Chip
                            size="small"
                            avatar={(
                              <Avatar src={
                                this.state.ack_user.wcf.avatar_url}
                              />
                            )}
                            component="a"
                            href={`/roster/${this.state.ack_user.id}`}
                            label={this.state.ack_user.username}
                            clickable
                          />
                        </Typography>
                      </Column>
                    </React.Fragment>
                  )}
                </Row>
              </Callout>
            </DialogContentText>
            <DialogContentText>
              <Typography variant="body2">{this.props.children}</Typography>
            </DialogContentText>
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

export const Event_excuse_list_item =
    withTheme(EventExcuseListItemComponent);
