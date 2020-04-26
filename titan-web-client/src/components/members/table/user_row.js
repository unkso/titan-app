import TableCell from '@material-ui/core/TableCell';
import { RouteLink } from '@titan/components/routes/route_link';
import { USER_PROFILE_ROUTE } from '@titan/modules/roster/routes';
import { format as formatDate } from 'date-fns';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MemberNameTag } from '@titan/components/members/member_name_tag';
import { routeBuilder } from '@titan/lib/routes';

/**
 * @param {{user: {}, onRemove: Function}} props
 */
export function UserRow (props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);
  const orgRoute = routeBuilder(USER_PROFILE_ROUTE, [props.user.id]);

  function removeUser () {
    setAnchorEl(undefined);
    props.onRemove(props.user);
  }

  return (
    <TableRow key={props.user.id} hover>
      <TableCell>
        <MemberNameTag
          avatarUrl={props.user.wcf.avatar_url}
          username={<RouteLink to={orgRoute}>{props.user.username}</RouteLink>}
          size="small"
        />
      </TableCell>
      <TableCell>{formatDate(props.user.wcf.last_activity_time,
        'MMMM dd, yyyy')}</TableCell>
      <TableCell>{formatDate(props.user.date_joined,
        'MMMM dd, yyyy')}</TableCell>
      <TableCell align="right">
        {props.onRemove && (
          <React.Fragment>
            <IconButton
              aria-label="More"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={isOpen}
              onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => removeUser()}>Remove</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </TableCell>
    </TableRow>
  );
}
