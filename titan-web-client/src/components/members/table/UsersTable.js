import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { UserRow } from 'titan/components/members/table/UserRow';
import Table from '@material-ui/core/Table';
import { IconEmptyState } from 'titan/components/EmptyStates/IconEmptyState';

/**
 * @param {{
 *  loading: boolean,
 *  data: {},
 *  error: {},
 *  onRemove: Function
 * }} props
 */
export function UsersTable (props) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Username</TableCell>
          <TableCell>Last Active</TableCell>
          <TableCell>Date Joined</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        <React.Fragment>
          {props.error ? (
            <TableRow>
              <TableCell colSpan={4}>
                <IconEmptyState
                  icon="exclamation-circle"
                  primaryText="Unable to load users"
                  secondaryText="An unexpected error occurred."
                  verticalMargin={48}
                />
              </TableCell>
            </TableRow>
          ) : !props.loading && props.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <IconEmptyState
                  icon="users"
                  primaryText="No users found"
                  verticalMargin={48}
                />
              </TableCell>
            </TableRow>
          ) : (
            <React.Fragment>
              {props.data && props.data.map((user, key) => (
                <UserRow key={key} user={user} onRemove={props.onRemove} />
              ))
              }
            </React.Fragment>
          )}
        </React.Fragment>
      </TableBody>
    </Table>
  );
}
