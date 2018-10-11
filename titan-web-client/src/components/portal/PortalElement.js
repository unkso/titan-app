import React from 'react'
import ReactDOM from 'react-dom'

class PortalElement extends React.Component {
  constructor (props) {
    super(props)
    this.menuWrapperEl = document.createElement('div')
    this.documentBody = document.body
  }

  componentDidMount () {
    this.documentBody.appendChild(this.menuWrapperEl)
  }

  componentWillUnmount () {
    this.documentBody.removeChild(this.menuWrapperEl)
  }

  render () {
    return ReactDOM.createPortal(
      this.props.children,
      this.menuWrapperEl
    )
  }
}

export default PortalElement
