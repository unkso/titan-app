import React from 'react';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import {
  ListOrganizationRoles,
  useTitanApiClient
} from 'titan/http/ApiClient';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

export function Roles (props) {
  const fetchRoles = useTitanApiClient(
    ListOrganizationRoles, { orgId: props.organization.id });

  return (
    <React.Fragment>
      <ContentBlock>
        <Card>
          <CardHeader title="Chain of Command" />
          <CardContent>
            {fetchRoles.data &&
            <List>
              {fetchRoles.data.filter(role => !!role.rank).map((role, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <IconButton href="">
                      <DragIndicatorIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText>{role.role}</ListItemText>
                  <ListItemText>
                    <Chip
                      avatar={(
                        <Avatar src={role.user_profile.wcf.avatar_url} />
                      )}
                      label={role.user_profile.username}
                    />
                  </ListItemText>
                  <ListItemText>
                    <Typography align="right" component="div">
                      <Button color="primary">Edit</Button>
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
            }
          </CardContent>
        </Card>
      </ContentBlock>
      <ContentBlock>
        <Card>
          <CardHeader title="Supporting Roles" />
          <CardContent>
            {fetchRoles.data &&
            <List>
              {fetchRoles.data.filter(role => !role.rank).map(role => (
                <ListItem>
                  <ListItemIcon>
                    <DragIndicatorIcon />
                  </ListItemIcon>
                  <ListItemText>{role.role}</ListItemText>
                </ListItem>
              ))}
            </List>
            }
          </CardContent>
        </Card>
      </ContentBlock>
    </React.Fragment>
  );
}
