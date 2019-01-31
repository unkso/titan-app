import React from 'react';
import PropTypes from 'prop-types';
import WithTheme from '../core/WithTheme';
import FormControl from '../form/FormControl';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    };
  }

  render() {
    const { multiLine, ...rest } = this.props;
    const control = multiLine ? 'textarea' : 'text';

    return (
      <FormControl {...rest} control={control}>
        {this.props.children}
      </FormControl>
    );
  }
}

TextField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  labelLeft: PropTypes.any,
  labelRight: PropTypes.func,
  fullWidth: PropTypes.bool,
  multiLine: PropTypes.string,
  onLabelLeftClick: PropTypes.func,
  onLabelRightClick: PropTypes.func
};

TextField.defaultProps = {
  onFocusChange: () => {},
  fullWidth: false,
  multiLine: false,
  onLabelLeftClick: null,
  onLabelRightClick: null
};

export default WithTheme(TextField);
