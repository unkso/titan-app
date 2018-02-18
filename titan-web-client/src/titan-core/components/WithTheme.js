import React from 'react'
import { getTitanInstance } from '../index'

export default function WithTheme (ComposedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.app = getTitanInstance()
    }

    render () {
      return <ComposedComponent titanTheme={this.app.getTheme()} />
    }
  }
}
