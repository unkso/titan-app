import React from 'react';
import PageHeader
  from '@titan/layouts/dashboard_old/components/page_header/page_header';
import PageHeaderTitle
  from '@titan/layouts/dashboard_old/components/page_header/page_header_title';
import { ContentBlock } from '@titan/components/block/content_block';
import Row from '@titan/components/grid/row';
import { ListUsersRequest, useTitanApiClient } from '@titan/http/api_client';
import Card from '@material-ui/core/Card';
import Column from '@titan/components/grid/column';
import { TextField } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useThrottle } from '@titan/hooks';
import Typography from '@material-ui/core/Typography';
import { UsersTable } from '@titan/components/members/table/users_table';

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
