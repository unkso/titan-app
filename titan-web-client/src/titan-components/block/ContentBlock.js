import React from 'react'
import styled from 'styled-components'

export const ContentBlock = styled.div`
  padding: 20px 50px;
`

class Block extends React.Component {
  render () {
    return (
      <ContentBlock>
        {this.props.children}
      </ContentBlock>
    )
  }
}

export default Block
