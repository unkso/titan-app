import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class FormControlFactory extends React.Component {
  renderNativeControl(control, props) {
    switch (control) {
      case 'textarea':
        return <textarea {...props} />
      default:
        return <input {...props} />
    }
  }

  render () {
    const { control, ...rest } = this.props

    if (_.isEmpty(control) || typeof control === 'string') {
      return this.renderNativeControl(control, rest)
    }

    const ControlComponent = control
    return <ControlComponent {...rest} />
  }
}

FormControlFactory.propTypes = {
  control: PropTypes.any
}

FormControlFactory.defaultProps = {
  type: 'text'
}

export default FormControlFactory
