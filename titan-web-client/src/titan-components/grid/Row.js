import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: column
`

class Row extends React.Component {
  render () {
    return (
      <RowWrapper>
        {this.props.children}
      </RowWrapper>
    )
  }
}

Row.propTypes = {
  reverse: PropTypes.bool,
  verticalJustify: PropTypes.oneOf(['top', 'center', 'bottom', 'between', 'around', 'stretch']),
  horizontalJustify: PropTypes.oneOf(['left', 'center', 'right', 'between', 'around']),
  alignItems: PropTypes.oneOf([]),
  children: PropTypes.arrayOf(PropTypes.node)
}

Row.defaultProps = {
  vertical: false,
  reverse: false,
  verticalAlign: 'top',
  horizontalAlign: 'left',
  itemAlign: PropTypes.oneOf()
}

export default Row
