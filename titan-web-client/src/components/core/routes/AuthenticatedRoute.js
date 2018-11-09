import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class AuthenticatedRoute extends React.Component {
  componentDidMount () {
    if (!this.props.auth.session) {
      window.location = '/auth/login'
    }
  }

  render () {
    return this.props.children
  }
}

AuthenticatedRoute.propTypes = {
  auth: PropTypes.object
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(AuthenticatedRoute)
