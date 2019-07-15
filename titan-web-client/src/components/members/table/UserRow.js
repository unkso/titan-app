import TableCell from '@material-ui/core/TableCell';
import Row from 'titan/components/Grid/Row';
import Column from 'titan/components/Grid/Column';
import Avatar from '@material-ui/core/Avatar';
import { RouteLink } from 'titan/components/Routes/RouteLink';
import { routeBuilder, USER_PROFILE_ROUTE } from 'titan/routes';
import { format as formatDate } from 'date-fns';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

export function UserRow (props) {
  return (
    <TableRow key={props.user.id} hover>
      <TableCell>
        <Row>
          <Column>
            <Avatar
              style={{ width: 20, height: 20 }}
              src={props.user.wcf.avatar_url}
            />
          </Column>
          <Column>
            <RouteLink to={routeBuilder(USER_PROFILE_ROUTE, [props.user.id])}>{props.user.username}</RouteLink>
          </Column>
        </Row>
      </TableCell>
      <TableCell>{formatDate(props.user.wcf.last_activity_time,
        'MMMM dd, yyyy')}</TableCell>
      <TableCell>{formatDate(props.user.date_joined,
        'MMMM dd, yyyy')}</TableCell>
    </TableRow>
  );
}
