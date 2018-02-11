import React from 'react'
import TitanLayout from './TitanLayout'

class DashboardLayout extends TitanLayout {
  render () {
    return (
      <div>
        <h1>Dashboard Layout</h1>
        {this.props.children}
      </div>
    )
  }
}

export default DashboardLayout
