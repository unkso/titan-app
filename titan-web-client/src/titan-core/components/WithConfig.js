import React from 'react'
import config from '../config'

export default function WithConfig (ComposedComponent) {
  return class extends React.Component {
    render () {
      return <ComposedComponent titanConfig={config} />
    }
  }
}
