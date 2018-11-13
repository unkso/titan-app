import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class FormControlFactory extends React.Component {
  renderSelect (props) {
    const children = props.children ? props.children : null;

    return <select {...props} onChange={(e) => props.onChange(e.target.value)}>{children}</select>;
  }

  renderDiv (props) {
    return (<div {...props}>{props.value}</div>);
  }

  renderNativeControl (control, props) {
    switch (control) {
      case 'textarea':
        return <textarea {...props} />;
      case 'select':
        return this.renderSelect(props);
      case 'div':
        return this.renderDiv(props);
      default:
        return <input {...props} />;
    }
  }

  render () {
    const { control, ...rest } = this.props;

    if (_.isEmpty(control) || typeof control === 'string') {
      return this.renderNativeControl(control, rest);
    }

    const ControlComponent = control;
    return <ControlComponent {...rest} />;
  }
}

FormControlFactory.propTypes = {
  control: PropTypes.any
};

FormControlFactory.defaultProps = {
  type: 'text'
};

export default FormControlFactory;
