import React from 'react';
import {
  ListOrganizationUsersRequest,
  useTitanApiClient
} from 'titan/http/ApiClient';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import { UsersTable } from 'titan/components/members/table/UsersTable';
import Card from '@material-ui/core/Card';

/**
 * @param {{organizationId: number}} props
 */
export function Members (props) {
  const fetchUsers = useTitanApiClient(ListOrganizationUsersRequest,
    { org_id: props.organizationId });
  return (
    <ContentBlock>
      <Card>
        <UsersTable {...fetchUsers} />
      </Card>
    </ContentBlock>
  );
}
