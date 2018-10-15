import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ActionButton from './ActionButton'

export const BaseButtonWrapper = styled(ActionButton)`
  font-size: .875rem;
  font-weight: 500;
  font-family: inherit;
  text-decoration: none;
  text-align: center;
  padding: 8px 16px;
  margin: 3px;
  outline: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  display: inline-block;
`

export const ButtonLabel = styled.span`
  display: flex;
  flex: 1;
`

export const ButtonIcon = styled.span`
  position: relative;
`

export const ButtonLabelWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  ${ButtonIcon}:first-child {
    margin-right: .5rem;
  }
  
  ${ButtonIcon}:last-child {
    margin-left: .5rem;
  }
`

class BaseButton extends React.Component {
  render () {
    let children = []
    const { iconLeft, iconRight, ...rest } = this.props

    if (iconLeft) {
      children.push(<ButtonIcon key="icon-left">{iconLeft}</ButtonIcon>)
    }

    children.push(<ButtonLabel key="btn-label">{this.props.children}</ButtonLabel>)

    if (iconRight) {
      children.push(<ButtonIcon key="icon-right">{iconRight}</ButtonIcon>)
    }

    return (
      <BaseButtonWrapper {...rest}>
        <ButtonLabelWrapper>{children}</ButtonLabelWrapper>
      </BaseButtonWrapper>
    )
  }
}

BaseButton.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  iconLeft: PropTypes.func,
  iconRight: PropTypes.func,
  titanTheme: PropTypes.object
}

BaseButton.defaultProps = {
  onClick: null,
  href: null,
  disabled: false,
  iconLeft: null,
  iconRight: null
}

export default BaseButton
