import React from 'react';
import Async from 'react-select/async';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {
  ListUsersRequest,
  makeTitanApiRequest
} from 'titan/http/ApiClient';

function SingleValue (props) {
  return (
    <Chip
      avatar={<Avatar src={props.data.wcf.avatar_url} />}
      label={`${props.data.username}`}
      size="small"
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
    >{props.data.username}</MenuItem>
  );
}

function Menu (props) {
  console.log('menu', props);
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
    selectProps: { TextFieldProps }
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

const components = {
  Control,
  SingleValue,
  Menu,
  Option,
  DropdownIndicator: () => null,
  LoadingIndicator: () => null
};

export function MemberAutocomplete () {
  return (
    <Async
      inputId="react-select-single"
      components={components}
      TextFieldProps={{
        label: 'Country',
        InputLabelProps: {
          htmlFor: 'react-select-single',
          shrink: true
        }
      }}
      placeholder="Select user"
      cacheOptions
      defaultOptions
      loadOptions={(username) => {
        return makeTitanApiRequest(ListUsersRequest, { username, limit: 5 })
          .then(res => res.data);
      }}
      onChange={value => {
        console.log('changed:', value);
      }}
    />
  );
}
