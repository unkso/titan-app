import React from 'react'
import { getTitanInstance } from '../index'

export default function WithConfig (ComposedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.app = getTitanInstance()
    }

    render () {
      return (
        <ComposedComponent
          {...this.props}
          titanConfig={this.app.getConfig()}
        />
      )
    }
  }
}
