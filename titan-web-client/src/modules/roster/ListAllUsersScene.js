import React from 'react';
import PageHeader
  from 'titan/layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle
  from 'titan/layouts/dashboard/components/PageHeader/PageHeaderTitle';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import Row from 'titan/components/Grid/Row';
import { ListUsersRequest, useTitanApiClient } from 'titan/http/ApiClient';
import Card from '@material-ui/core/Card';
import Column from 'titan/components/Grid/Column';
import { TextField } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useThrottle } from 'titan/hooks';
import Typography from '@material-ui/core/Typography';
import { UsersTable } from 'titan/components/members/table/UsersTable';

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
                        <span className="fas fa-search" />
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
          <UsersTable
            data={fetchUsers.data}
            error={fetchUsers.error}
            loading={fetchUsers.loading}
          />
        </Card>
      </ContentBlock>
    </div>
  );
}
