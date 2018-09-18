import React from 'react'
import PropTypes from 'prop-types'

class UnauthenticatedRoute extends React.Component {
  componentDidMount () {
    console.log(this.props.context)
  }

  render () {
    return this.props.children
  }
}

UnauthenticatedRoute.propTypes = {
  context: PropTypes.object
}

export default UnauthenticatedRoute
