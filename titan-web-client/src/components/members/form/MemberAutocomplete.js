import React from 'react';
import Async from 'react-select/async';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography/Typography';
import {
  ListUsersRequest,
  makeTitanApiRequest
} from 'titan/http/ApiClient';
import { emphasize } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290
  },
  input: {
    display: 'flex',
    padding: '0 0 0 0',
    height: 'auto'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  singleValue: {
    fontSize: 16,
    marginLeft: 2,
    letterSpacing: 'inherit'
  },
  placeholder: {
    position: 'absolute',
    left: '1px',
    bottom: 5,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  }
}));

function inputComponent ({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
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
      {props.data.username}
    </MenuItem>
  );
}

function Placeholder (props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      component="div"
      color="textSecondary"
      className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

/*
<Chip
  avatar={<Avatar src={props.data.wcf.avatar_url} />}
  label={`${props.data.username}`}
  size="small"
/>
*/
function SingleValue (props) {
  return (
    <Typography
      component="div"
      className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.data.username}
    </Typography>
  );
}

function ValueContainer (props) {
  return <div
    className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu (props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
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
          className: classes.input,
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
  Menu,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  DropdownIndicator: () => null,
  LoadingIndicator: () => null,
  IndicatorsContainer: () => null
};

export function MemberAutocomplete () {
  const classes = useStyles();
  const theme = useTheme();

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  };

  return (
    <div className={classes.root}>
      <Async
        classes={classes}
        styles={selectStyles}
        placeholder="Search a country (start with a)"
        inputId="react-select-single"
        components={components}
        TextFieldProps={{
          label: 'Country',
          InputLabelProps: {
            htmlFor: 'react-select-single',
            shrink: true
          }
        }}
        cacheOptions
        defaultOptions
        isClearable
        loadOptions={(username) => {
          return makeTitanApiRequest(ListUsersRequest, { username, limit: 5 }).
            then(res => res.data);
        }}
        onChange={value => {
          console.log('changed:', value);
        }}
      />
    </div>
  );
}
