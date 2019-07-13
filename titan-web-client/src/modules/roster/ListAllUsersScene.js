import React from 'react';
import PageHeader
  from 'titan/layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle
  from 'titan/layouts/dashboard/components/PageHeader/PageHeaderTitle';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { format as formatDate } from 'date-fns';
import Avatar from '@material-ui/core/Avatar';
import Row from 'titan/components/Grid/Row';
import { ListUsersRequest, useTitanApiClient } from 'titan/http/ApiClient';
import Card from '@material-ui/core/Card';
import Column from 'titan/components/Grid/Column';
import { TextField } from '@material-ui/core';
import { routeBuilder, USER_PROFILE_ROUTE } from 'titan/routes';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RouteLink } from 'titan/components/Routes/RouteLink';
import { useThrottle } from 'titan/hooks';
import Typography from '@material-ui/core/Typography';

export function ListAllUsersScene () {
  const [username, setUsername] = useThrottle('', 300);
  const fetchUsers = useTitanApiClient(
    ListUsersRequest, { username, limit: 10 });

  return (
    <div>
      <PageHeader>
        <PageHeaderTitle title="Community" />
      </PageHeader>
      <ContentBlock>
        <Card>
          <CardContent>
            <Row alignItems="center">
              <Column>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon="search" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search by username"
                  onChange={e => setUsername(e.target.value)}
                />
              </Column>
              <Column grow={1}>
                <Typography align="right">showing {fetchUsers.data ? fetchUsers.data.length : 0} of many</Typography>
              </Column>
            </Row>
          </CardContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Last Active</TableCell>
                <TableCell>Date Joined</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <React.Fragment>
                {fetchUsers.error ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography align="center">Unable to load users.</Typography>
                    </TableCell>
                  </TableRow>
                ) : !fetchUsers.loading && fetchUsers.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography align="center">No results found.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <React.Fragment>
                    {fetchUsers.data && fetchUsers.data.map(user => (
                      <TableRow key={user.id} hover>
                        <TableCell>
                          <Row>
                            <Column>
                              <Avatar
                                style={{ width: 20, height: 20 }}
                                src={user.wcf.avatar_url}
                              />
                            </Column>
                            <Column>
                              <RouteLink to={routeBuilder(USER_PROFILE_ROUTE, [user.id])}>{user.username}</RouteLink>
                            </Column>
                          </Row>
                        </TableCell>
                        <TableCell>{formatDate(user.wcf.last_activity_time,
                          'MMMM dd, yyyy')}</TableCell>
                        <TableCell>{formatDate(user.date_joined,
                          'MMMM dd, yyyy')}</TableCell>
                      </TableRow>
                    ))
                    }
                  </React.Fragment>
                )}
              </React.Fragment>
            </TableBody>
          </Table>
        </Card>
      </ContentBlock>
    </div>
  );
}
