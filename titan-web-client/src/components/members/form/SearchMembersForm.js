import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useThrottle } from 'titan/hooks';
import {
  ListUsersRequest,
  useTitanApiClient
} from 'titan/http/ApiClient';
import List from '@material-ui/core/List';

/**
 * @param {{orgId, orgCoc, users}} props
 */
export function SearchMembersForm (props) {
  const [username, setUsername] = useThrottle('', 325);
  const fetchUsers = useTitanApiClient(
    ListUsersRequest, { username, limit: 5 });

  return (
    <div>
      <TextField
        fullWidth
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
      <List component="div" dense style={{ height: 285 }}>
        {fetchUsers.data && fetchUsers.data.map(
          (user, index) => props.itemRenderer(user, index))}
      </List>
    </div>
  );
}

SearchMembersForm.propTypes = {
  itemRenderer: PropTypes.func.isRequired
};
