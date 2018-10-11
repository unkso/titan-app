import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import WithTheme from '../core/WithTheme'

export const MenuItemWrapper = styled.div`
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.hoverBgColor};
  }
`

class MenuItem extends React.Component {
  onSelect () {
    const value = this.props.value ? this.props.value : this.props.text
    this.props.onSelect(value)
  }


  render () {
    return (
      <MenuItemWrapper
        onClick={this.onSelect.bind(this)}
        hoverBgColor={this.props.titanTheme.palette.neutral}
      >
        {this.props.text}
      </MenuItemWrapper>
    )
  }
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.any,
  onSelect: PropTypes.func
}

MenuItem.defaultProps = {
  onSelect: () => {}
}

export default WithTheme(MenuItem)
