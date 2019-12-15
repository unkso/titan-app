import React from 'react';
import PropTypes from 'prop-types';
import {
  ListUsersRequest,
  makeTitanApiRequest
} from '@titan/http/api_client';
import { Autocomplete } from '@titan/components/autocomplete/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

export function MemberAutocomplete (props) {
  return (
    <Autocomplete
      components={{
        SingleValue: (props) => (
          <Chip
            avatar={<Avatar src={props.data.wcf.avatar_url} />}
            label={props.data.username}
            size="small"
          />
        )
      }}
      defaultValue={props.defaultValue}
      inputId="member-autocomplete"
      inputLabel={props.inputLabel}
      inputPlaceholder={props.inputPlaceholder}
      loadOptions={(username) =>
        makeTitanApiRequest(ListUsersRequest, { username, limit: 5 })
          .then(res => res.data)
      }
      onChange={props.onChange}
      variant={props.variant}
    />
  );
}

MemberAutocomplete.propTypes = {
  defaultValue: PropTypes.any,
  inputLabel: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['outlined', 'filled'])
};

MemberAutocomplete.defaultProps = {
  inputPlaceholder: 'username'
};
