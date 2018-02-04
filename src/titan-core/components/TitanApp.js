import React from 'react'
import PropTypes from 'prop-types'
import { mountApplicationRoutes, resolveTheme } from '../lib/titan'

class TitanApp extends React.Component {
  constructor (props) {
    super(props)
    this.routes = mountApplicationRoutes(this.props.app)
    this.theme = resolveTheme(this.props.theme)
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

TitanApp.propTypes = {
  app: PropTypes.object,
  theme: PropTypes.object
}

TitanApp.defaultProps = {
  app: {},
  theme: {}
}

export default TitanApp
