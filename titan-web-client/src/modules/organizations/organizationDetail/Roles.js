import React from 'react';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import {
  ListOrganizationRoles, ROLE_SCOPES,
  useTitanApiClient
} from 'titan/http/ApiClient';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { OrderableList } from 'titan/components/List/OrderableList';
import { MemberNameTag } from 'titan/components/members/MemberNameTag';
import CardActions from '@material-ui/core/CardActions';
import { MemberAutocomplete } from 'titan/components/members/form/MemberAutocomplete';

export function Roles (props) {
  const fetchRoles = useTitanApiClient(ListOrganizationRoles,
    { orgId: props.organization.id, scope: ROLE_SCOPES.RANKED });

  return (
    <React.Fragment>
      <ContentBlock>
        <Card>
          <CardHeader title="Autocomplete" />
          <CardContent style={{ height: 500 }}>
            <MemberAutocomplete />
          </CardContent>
        </Card>
      </ContentBlock>
      <ContentBlock>
        <Card>
          <CardHeader title="Chain of Command" />
          <CardContent>
            {fetchRoles.data &&
              <OrderableList
                items={fetchRoles.data.filter(role => !!role.rank)}
                itemRenderer={(role, snapshot, index) => (
                  <React.Fragment>
                    <ListItemText>{role.role}</ListItemText>
                    <ListItemText>
                      <MemberNameTag
                        avatarUrl={role.user_profile.wcf.avatar_url}
                        avatarPosition="left"
                        username={role.user_profile.username}
                      />
                    </ListItemText>
                    <ListItemText>
                      <Typography align="right" component="div">
                        <Button color="primary">Edit</Button>
                      </Typography>
                    </ListItemText>
                  </React.Fragment>
                )}
              />
            }
          </CardContent>
          <CardActions>
            <Button color="primary">Add Role</Button>
          </CardActions>
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
