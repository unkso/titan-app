import React from 'react'
import { withTheme } from 'styled-components'

/**
 * @deprecated Use withTheme from style-components package.
 *
 * @param ComposedComponent
 * @returns {{new(): {render(): *}, prototype: {render(): *}}}
 * @constructor
 */
export default function WithTheme (ComposedComponent) {
  return class extends React.Component {
    render () {
      return (withTheme(
        <ComposedComponent
          {...this.props}
          titanTheme={this.props.theme}
        />
      ))
    }
  }
}
