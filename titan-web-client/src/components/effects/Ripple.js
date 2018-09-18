import React from 'react'
import Ink from 'react-ink'
import styled from 'styled-components'

export const RippleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
`

class Ripple extends React.Component {
  render () {
    return (
      <RippleWrapper>
        {this.props.children}
        <Ink {...this.props} />
      </RippleWrapper>
    )
  }
}

export default Ripple
