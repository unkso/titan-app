import React from 'react'
import styled from 'styled-components'
import WithTheme from '../core/WithTheme'

export const ModalHeaderWrapper = styled.div`
  border-bottom: 1px solid ${props => props.borderColor};
  padding: 20px;
  
  > * {
    padding: 0;
    margin: 0;
  }
`

class ModalHeader extends React.Component {
  render () {
    let children = this.props.children
    if (typeof this.props.children === 'string') {
      children = (<h2>{this.props.children}</h2>)
    }

    return (
      <ModalHeaderWrapper borderColor={this.props.titanTheme.palette.neutral}>
        {children}
      </ModalHeaderWrapper>
    )
  }
}

export default WithTheme(ModalHeader)
