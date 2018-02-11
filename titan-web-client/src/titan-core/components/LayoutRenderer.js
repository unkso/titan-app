import React from 'react'
import PropTypes from 'prop-types'

class LayoutRenderer extends React.Component {
  render () {
    const Layout = this.props.layout
    const scenes = this.props.scenes.map((scene) => {
      const Scene = scene.scene
      return <Scene />
    })

    return (<Layout>{scenes}</Layout>)
  }
}

LayoutRenderer.propTypes = {
  layout: PropTypes.func.isRequired,
  scenes: PropTypes.arrayOf(PropTypes.func).isRequired
}

export default LayoutRenderer
