import React from 'react'

class EmptyDarkLayout extends React.Component {
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
