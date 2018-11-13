import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'

const ELEMENTS = {
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'h6': 'h6',
  'p': 'p',
  'span': 'text',
  'div': 'text'
}

/**
 * @deprecated
 */
class Typography extends React.Component {
  getStyles (elementName) {
    let styles = {}
    if (!this.props.theme.hasOwnProperty('typography')) {
      return styles
    }

    if (this.props.theme.typography.hasOwnProperty('text')) {
      styles = { ...this.props.theme.typography.text }
    }

    if (this.props.theme.typography.hasOwnProperty(elementName)) {
      styles = { ...this.props.theme.typography[elementName] }
    }

    return styles
  }

  render () {
    const Component = ELEMENTS[this.props.element]
    const styles = this.getStyles(this.props.element)
    return (
      <Component style={styles}>
        {this.props.children}
      </Component>
    )
  }
}

Typography.propTypes = {
  element: PropTypes.string
}

Typography.defaultProps = {
  element: 'span'
}

export default withTheme(Typography)
