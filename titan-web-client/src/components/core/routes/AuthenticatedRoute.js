import React from 'react'
import PropTypes from 'prop-types'

class AuthenticatedRoute extends React.Component {
  componentDidMount () {
    console.log(this.props.context)
  }

  render () {
    return this.props.children
  }
}

AuthenticatedRoute.propTypes = {
  context: PropTypes.object
}

export default AuthenticatedRoute
