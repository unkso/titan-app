import React from 'react'
import styled from 'styled-components'
import WithTheme from '../../titan-core/components/WithTheme'

export const TableBodyOuterWrapper = styled.div``

export const TableBodyInnerWrapper = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`

class TableBody extends React.Component {
  render () {
    return (
      <TableBodyOuterWrapper>
        <TableBodyInnerWrapper>
          <tbody>
            {this.props.children}
          </tbody>
        </TableBodyInnerWrapper>
      </TableBodyOuterWrapper>
    )
  }
}

export default WithTheme(TableBody)
