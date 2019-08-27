import React, { useState } from 'react';
import Select from 'react-select';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import MenuItem from 'titan/components/menu/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useThrottle } from 'titan/hooks';
import { ListUsersRequest, useTitanApiClient } from 'titan/http/ApiClient';

function SingleValue (props) {
  return (
    <Chip
      avatar={<Avatar src={props.wcf.avatar_url} />}
      label={`${props.username}`}
    />
  );
}

function Option (props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Menu (props) {
  return (
    <Paper square {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

function inputComponent ({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control (props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

/*
const components = {
  Control,
  Menu,
  Option,
  SingleValue
};
*/

const components = {
  Control
};

export function MemberAutocomplete () {
  const [username, setUsername] = useThrottle('', 325);
  const fetchUsers = useTitanApiClient(
    ListUsersRequest, { username, limit: 5 });
  return (
    <Select
      inputId="react-select-single"
      components={components}
      TextFieldProps={{
        label: 'Country',
        InputLabelProps: {
          htmlFor: 'react-select-single',
          shrink: true
        }
      }}
      placeholder="Search a country (start with a)"
      options={fetchUsers.data ? fetchUsers.data.map(user => ({ value: user.username, label: user.username })) : []}
      onChange={value => {
        console.log('changed:', value);
        setUsername(value);
      }}
    />
  );
}
