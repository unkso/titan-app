import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import BaseButton, { BaseButtonWrapper } from '../baseButton/BaseButton'
import color from 'color'

export const ButtonWrapper = styled.div`
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  display: ${props => props.fullWidth ? 'block' : 'inline-block'};
  margin: 3px;
  position: relative;
  
  ${BaseButtonWrapper} {
    display: block;
    margin: 0;
    color: ${props => props.textColor};
    background-color: ${props => props.bgColor};

    &:hover {
      box-shadow: 0 0 0 3px ${props => props.shadowColor};
    }

    &:disabled {
      background-color: ${props => color(props.bgColor).lighten(1.1).hex()};

      &:hover {
        box-shadow: none;
        cursor: default;
      }
    }
  }
`

/**
 * @deprecated
 */
class Button extends React.Component {
  render () {
    const { primary, secondary, fullWidth, ...rest } = this.props
    let textColor, bgColor
    if (primary) {
      bgColor = this.props.theme.palette.primary.main
      textColor = this.props.theme.palette.primaryText
    } else if (secondary) {
      bgColor = this.props.theme.palette.secondary.main
      textColor = this.props.theme.palette.secondaryText
    } else {
      bgColor = this.props.theme.palette.neutral
      textColor = this.props.theme.palette.neutralText
    }

    const shadowColor = color(bgColor).rgb().fade(0.7).string()

    return (
      <ButtonWrapper
        fullWidth={fullWidth}
        textColor={textColor}
        shadowColor={shadowColor}
        bgColor={bgColor}
      >
        <BaseButton {...rest}>{this.props.children}</BaseButton>
      </ButtonWrapper>
    )
  }
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  iconLeft: PropTypes.func,
  iconRight: PropTypes.func,
  theme: PropTypes.object
}

Button.defaultProps = {
  primary: false,
  secondary: false,
  onClick: null,
  href: null,
  disabled: false,
  fullWidth: false,
  iconLeft: null,
  iconRight: null
}

export default withTheme(Button)
