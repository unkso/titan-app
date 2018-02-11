import React from 'react'
import PropTypes from 'prop-types'

class LayoutRenderer extends React.Component {
  render () {
    const Layout = this.props.layout
    const Scene = this.props.scene

    return (
      <Layout>
        <Scene />
      </Layout>
    )
  }
}

LayoutRenderer.propTypes = {
  layout: PropTypes.func.isRequired,
  scene: PropTypes.func.isRequired
}

export default LayoutRenderer
