import React from 'react';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import Card from '@material-ui/core/Card';
import { CardContent, Typography } from '@material-ui/core';
import { ListUsersRequest, useTitanApiClient } from 'titan/http/ApiClient';
import CardHeader from '@material-ui/core/CardHeader';

export function Roles (props) {
  const fetchRoles = useTitanApiClient(
    ListUsersRequest, { username: '', limit: 5 });

  return (
    <React.Fragment>
      <ContentBlock>
        <Card>
          <CardHeader title="Chain of Command" />
          <CardContent>
            Goes here
          </CardContent>
        </Card>
      </ContentBlock>
      <ContentBlock>
        <Card>
          <CardHeader title="Supporting Roles" />
          <CardContent>
            Goes here
          </CardContent>
        </Card>
      </ContentBlock>
    </React.Fragment>
  );
}
