import React from 'react'
import TitanLayout from './TitanLayout'

class EmptyDarkLayout extends TitanLayout {
  render () {
    return (
      <div>
        <h1>Empty dark layout</h1>
        {this.props.children}
      </div>
    )
  }
}

export default EmptyDarkLayout
