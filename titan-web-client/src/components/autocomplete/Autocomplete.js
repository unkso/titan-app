import React from 'react';
import PropTypes from 'prop-types';
import Async from 'react-select/async';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290
  },
  input: {
    display: 'flex',
    height: 'auto'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 24
  },
  singleValue: {
    fontSize: 16,
    marginLeft: 2,
    letterSpacing: 'inherit'
  },
  placeholder: {
    position: 'absolute',
    marginLeft: 1,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(0),
    left: 0,
    right: 0
  }
}));

function inputComponent ({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
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

function Option (props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      {...props.innerProps}>{props.data.username}</MenuItem>
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

function ValueContainer (props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function DefaultSingleValue (props) {
  return (
    <Typography
      component="div"
      className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.data.username}
    </Typography>
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

const defaultComponents = {
  Control,
  Menu,
  Option,
  Placeholder,
  SingleValue: DefaultSingleValue,
  ValueContainer,
  DropdownIndicator: () => null,
  LoadingIndicator: () => null,
  IndicatorsContainer: () => null
};

export function Autocomplete (props) {
  const classes = useStyles();
  const components = { ...defaultComponents, ...props.components };

  return (
    <div className={classes.root}>
      <Async
        cacheOptions
        classes={classes}
        components={components}
        defaultOptions
        inputId={props.inputId}
        isClearable
        loadOptions={props.loadOptions}
        onChange={props.onChange}
        placeholder={props.inputPlaceholder}
        TextFieldProps={{
          label: props.inputLabel,
          InputLabelProps: {
            htmlFor: props.inputId,
            shrink: true
          },
          variant: props.variant
        }}
      />
    </div>
  );
}

Autocomplete.propTypes = {
  components: PropTypes.object,
  inputId: PropTypes.string.isRequired,
  inputLabel: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  loadOptions: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['outlined', 'filled'])
};

Autocomplete.defaultProps = {
  components: {}
};
