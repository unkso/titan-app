import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import BaseButton, { BaseButtonWrapper } from '../baseButton/BaseButton';
import color from 'color';

export const ButtonWrapper = styled.div`
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  display: ${props => props.fullWidth ? 'block' : 'inline-block'};
  margin: 3px;
  
  ${BaseButtonWrapper} {
    display: block;
    margin: 0;
    color: ${props => props.textColor};
    background-color: transparent;

    &:hover {
      background-color: ${props => props.hoverBgColor};
    }

    &:disabled {
      background-color: ${props => color(props.bgColor).lighten(1.1).hex()};

      &:hover {
        cursor: default;
      }
    }
  }
`;

class FlatButton extends React.Component {
  render() {
    const { primary, fullWidth, ...rest } = this.props;
    let textColor;
    if (primary) {
      textColor = this.props.theme.palette.primary;
    } else {
      textColor = this.props.theme.palette.textPrimary;
    }

    const hoverBgColor = this.props.theme.palette.neutral;
    return (
      <ButtonWrapper
        fullWidth={fullWidth}
        textColor={textColor}
        hoverBgColor={hoverBgColor}
      >
        <BaseButton {...rest}>{this.props.children}</BaseButton>
      </ButtonWrapper>
    );
  }
}

FlatButton.propTypes = {
  primary: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  iconLeft: PropTypes.func,
  iconRight: PropTypes.func,
  theme: PropTypes.object
};

FlatButton.defaultProps = {
  primary: false,
  onClick: null,
  href: null,
  disabled: false,
  fullWidth: false,
  iconLeft: null,
  iconRight: null
};

FlatButton.defaultProps = {
  primary: false
};

export default withTheme(FlatButton);
