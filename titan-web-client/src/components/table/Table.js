import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import WithTheme from '../core/WithTheme'
import { TableBodyOuterWrapper } from './TableBody'
import { TableHeaderWrapper } from './TableHeader'

export const TableWrapper = styled.div`
  max-height: ${props => !props.fixedHeader ? `${props.height}px` : 'auto'};
  overflow: ${props => !props.fixedHeader ? 'auto' : 'inherit'};
  
  /** Compensate for width of scroll bar **/
  ${TableHeaderWrapper} {
    padding-right: 15px;
  }
  
  ${TableBodyOuterWrapper} {
    max-height: ${props => props.fixedHeader ? `${props.height}px` : 'none'};
    overflow: ${props => props.fixedHeader ? 'auto' : 'inherit'};
  }
`

class Table extends React.Component {
  render () {
    const height = this.props.height ? this.props.height : 'auto'
    return (
      <TableWrapper
        fixedHeader={this.props.fixedHeader}
        height={height}
      >
        {this.props.children}
      </TableWrapper>
    )
  }
}

Table.propTypes = {
  fixedHeader: PropTypes.bool,
  height: PropTypes.number
}

Table.defaultProps = {
  fixedHeader: true,
  height: null
}

export default WithTheme(Table)
