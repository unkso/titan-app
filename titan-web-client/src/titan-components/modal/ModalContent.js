import React from 'react'
import styled from 'styled-components'

export const ModalContentWrapper = styled.div`
  padding: 10px 20px;
`

class ModalContent extends React.Component {
  render () {
    return (
      <ModalContentWrapper>
        {this.props.children}
      </ModalContentWrapper>
    )
  }
}

export default ModalContent
