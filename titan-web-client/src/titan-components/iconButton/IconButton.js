import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Ripple from '../effects/Ripple'
import BaseButton, { BaseButtonWrapper } from '../baseButton/BaseButton'

export const IconButtonWrapper = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 100%;
  padding: .5rem .6rem;
  
  ${BaseButtonWrapper} {
    padding: 0;
    background: transparent;
  }
`

class IconButton extends React.Component {
  render () {
    return (
      <IconButtonWrapper size={this.props.size}>
        <BaseButton>
          {this.props.icon}
          <Ripple style={{borderRadius: "100%"}} />
        </BaseButton>
      </IconButtonWrapper>
    )
  }
}

IconButton.propTypes = {
  icon: PropTypes.func
}

export default IconButton
