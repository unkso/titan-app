import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { UserRow } from 'titan/components/members/table/UserRow';
import Table from '@material-ui/core/Table';

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
                <Typography align="center">Unable to load users.</Typography>
              </TableCell>
            </TableRow>
          ) : !props.loading && props.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography align="center">No results found.</Typography>
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
