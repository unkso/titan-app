import React, { useEffect, useState } from 'react';
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
import Chip from '@material-ui/core/Chip';
import styled from 'styled-components';
import useTheme from '@material-ui/core/styles/useTheme';
import { useAcl } from '@titan/hooks/acl';
import { PERMISSION_CAN_ACK_EVENT_EXCUSE } from '@titan/acl_rules';

/** TODO Move to a dedicated component with theme variants. */
const Callout = styled.div`
    background: #f0f0f0;
    border-radius: 4px;
`;

export function EventExcuseListItem (props) {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ackUser, setAckUser] = useState(null);
  const [ackDate, setAckDate] = useState(null);
  const canAckExcuse = useAcl(acl => acl.newBuilder()
      .hasAclPermission(PERMISSION_CAN_ACK_EVENT_EXCUSE)
      .and(acl.hasLeadershipRole())
      .build());

  useEffect(() => {
    if (props.excuse.ack_user) {
      setAckDate(new Date(props.excuse.ack_date).toLocaleDateString());
      setAckUser(props.excuse.ack_user);
    }
  }, [props.excuse.ack_user]);

  function getEventExcuseListItemTheme (type) {
    switch (type) {
      case EVENT_TYPE_MEETING:
        return {
          color: theme.palette.secondary.light,
          icon: <span className="fas fa-users" />
        };
      case EVENT_TYPE_NCO_MEETING:
        return {
          color: theme.palette.secondary.light,
          icon: <span className="fas fa-users" />
        };
      case EVENT_TYPE_PRACTICE:
        return {
          color: theme.palette.secondary.light,
          icon: <span className="fas fa-gamepad" />
        };
      case EVENT_TYPE_SCRIM:
        return {
          color: props.theme.palette.primary.light,
          icon: <span className="fas fa-shield-alt" />
        };
      case EVENT_TYPE_TRAINING:
        return {
          color: theme.palette.secondary.light,
          icon: <span className="fas fa-dumbbell" />
        };
      default:
        return {
          color: theme.palette.secondary.light,
          icon: <span className="fas fa-info" />
        };
    }
  }

  function onAck (excuse) {
    setDialogOpen(false);
    setAckDate(new Date(excuse.ack_date).toLocaleDateString());
    setAckUser(excuse.ack_user);
  }

  const excuseTheme = getEventExcuseListItemTheme(props.type);
  const eventDate = (new Date(props.excuse.event_date)).toLocaleDateString();
  const submissionDate = (new Date(props.excuse.date_created)).toLocaleDateString();

  return (
    <React.Fragment>
      <BorderedCard
        highlightLeft={excuseTheme.color}
        onClick={() => setDialogOpen(true)}>
        <List component="div">
          <ListItem component="div">
            <Typography
              component="div"
              style={{ color: excuseTheme.color, marginRight: 16 }}>{excuseTheme.icon}</Typography>
            <ListItemText>
              <Typography variant="body1" color="textSecondary">{eventDate} | {props.excuse.user.username}</Typography>
              <Typography variant="subtitle1">{props.type}</Typography>
            </ListItemText>
            <ListItemText>
              {ackUser && (
                <Typography align="right">
                  <Tooltip title={`Ack by ${ackUser.username}`}>
                      <span
                        className="fas fa-check"
                        style={{ color: theme.palette.success }}
                      />
                  </Tooltip>
                </Typography>
              )}
            </ListItemText>
          </ListItem>
        </List>
      </BorderedCard>
      <Dialog open={dialogOpen} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Row>
            <Column>
              <span>Excuse for {props.excuse.event_type.name}</span>
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
                      props.excuse.user.wcf.avatar_url}
                    />
                  )}
                  component="a"
                  href={`/roster/${props.excuse.user.id}`}
                  label={props.excuse.user.username}
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
                {ackDate && (
                  <React.Fragment>
                    <Column>
                      <Typography variant="subtitle2" element="span">
                        <span><b>Ack:</b> {ackDate} by </span>
                        <Chip
                          size="small"
                          avatar={(
                            <Avatar src={ackUser.wcf.avatar_url} />
                          )}
                          component="a"
                          href={`/roster/${ackUser.id}`}
                          label={ackUser.username}
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
            <Typography variant="body2">{props.children}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          {(!ackUser && canAckExcuse) &&
          <AckEventExcuseButton
            excuseId={props.excuse.id}
            onAck={(excuse) => onAck(excuse)}
          />
          }
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
