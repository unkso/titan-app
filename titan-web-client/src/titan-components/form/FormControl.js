import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import color from 'color'
import WithTheme from '../../titan-core/components/WithTheme'
import FormControlFactory from './FormControlFactory'
import _ from 'lodash'

export const FormControlInput = styled(FormControlFactory)`
  width: 100%;
  min-height: 1.5rem;
  font-size: inherit;
  font-family: inherit;
  line-height: 1.5rem;
  color: inherit;
  padding: 8px;
  border: none;
  outline: none;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  background-color: transparent;
  display: flex;
  flex: 1;
`

export const FormControlSideLabel = styled.div`
    height: 100%;  
    font-size: .8rem;
    font-weight: 500;
    text-align: center;
    cursor: ${props => props.hasAction ? 'pointer' : 'default'};
    margin-left: 8px;
    align-self: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
`

export const FormControlWrapper = styled.div`
  width: ${props => props.fullWidth ? '100%' : '260px'};
  color: ${props => props.textColor};
  margin: 3px;
  border: 2px solid ${props => props.borderColor};
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  
  ${FormControlSideLabel} {
    color: ${props => color(props.textColor).fade(0.8).toString()}
  }
  
  ${FormControlSideLabel}:first-child {
      margin-left: 8px;
  }
  
  ${FormControlSideLabel}:last-child {
      margin-right: 8px;
  }
`

class FormControl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFocused: false
    }
  }

  onChange (e) {
    this.onBlur()
    this.props.onChange(e)
  }

  onFocus () {
    this.props.onFocus()
    this.props.onFocusChange(this.state.isFocused)
    this.setState({ isFocused: true })
  }

  onBlur () {
    this.props.onBlur()
    this.props.onFocusChange(this.state.isFocused)
    this.setState({ isFocused: false })
  }

  render () {
    const {
      fullWidth,
      labelLeft,
      labelRight,
      onLabelLeftClick,
      onLabelRightClick,
      ...rest
    } = this.props
    const children = []

    if (labelLeft) {
      children.push(
        <FormControlSideLabel
          hasAction={_.isFunction(onLabelLeftClick) && !this.props.disabled}
          onClick={onLabelLeftClick}
        >
          {labelLeft}
        </FormControlSideLabel>
      )
    }

    children.push(
      <FormControlInput
        {...rest}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
        onChange={this.onChange.bind(this)}
      >
        {this.props.children}
      </FormControlInput>
    )

    if (labelRight) {
      children.push(
        <FormControlSideLabel
          hasAction={_.isFunction(onLabelRightClick)}
          onClick={onLabelRightClick}
        >
          {labelRight}
        </FormControlSideLabel>
      )
    }

    let borderColor
    if (this.state.isFocused) {
      borderColor = this.props.titanTheme.palette.primary
    } else {
      borderColor = this.props.titanTheme.palette.neutral
    }

    return (
      <FormControlWrapper
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        fullWidth={fullWidth}
        textColor={this.props.titanTheme.palette.textPrimary}
        borderColor={borderColor}
        focusBorderColor={this.props.titanTheme.palette.primary}
      >
        {children}
      </FormControlWrapper>
    )
  }
}

FormControl.propTypes = {
  control: PropTypes.any,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onFocusChange: PropTypes.func,
  labelLeft: PropTypes.any,
  labelRight: PropTypes.func,
  onLabelLeftClick: PropTypes.func,
  onLabelRightClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool
}

FormControl.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onClick: () => {},
  onFocusChange: () => {},
  onLabelLeftClick: () => {},
  onLabelRightClick: () => {},
  fullWidth: false,
  disabled: false
}

export default WithTheme(FormControl)
