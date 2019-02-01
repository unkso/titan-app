import React from 'react';
import PropTypes from 'prop-types';
import FormControl, { FormControlWrapper } from '../form/FormControl';
import MenuItem, { MenuItemWrapper } from '../menu/MenuItem';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import ArrowDown from '@fortawesome/fontawesome-free-solid/faSortDown';
import PortalElement from '../portal/PortalElement';
import WithTheme from '../core/WithTheme';
import MobileDetect from 'mobile-detect/mobile-detect';
import _ from 'lodash';

export const SelectFieldWrapper = styled.div`
  ${FormControlWrapper} {
    border-color: ${props => props.menuStyles.borderColor};
    background-color: ${props => props.menuStyles.bgColor};
    border-bottom-left-radius: ${props => props.menuStyles.borderBottomRadius};
    border-bottom-right-radius: ${props => props.menuStyles.borderBottomRadius};
    margin: 0;
  }
`;

export const SelectFieldMenuOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: ${props => props.show ? 'block' : 'none'};
`;

export const SelectFieldMenuWrapper = styled.div`
  width: ${props => props.width}px;
  background: ${props => props.background};
  border-top: 2px solid ${props => props.borderColor};
  position: relative;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  box-shadow: 0 1em 2em -1.5em rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  
  ${MenuItemWrapper} {
    &:last-child {
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
`;

class ThemedSelectField extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      menuWidth: null,
      menuTop: null,
      menuLeft: null,
      showMenu: false,
      isFocused: false
    };

    this.menuWrapperEl = null;
    this.mobileDetect = new MobileDetect(window.navigator.userAgent);

    this.onMenuClick = this.onMenuClick.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onMenuClick () {
    if (this.props.disabled) {
      return null;
    }

    let updatedState = { isFocused: true };

    if (!this.mobileDetect.mobile() && !this.mobileDetect.tablet()) {
      const rect = this.menuWrapperEl.getBoundingClientRect();
      updatedState = {
        ...updatedState,
        menuWidth: this.menuWrapperEl.clientWidth,
        menuTop: rect.top + rect.height - 3,
        menuLeft: rect.left,
        showMenu: true
      };
    }

    this.setState(updatedState);
  }

  hideMenu () {
    this.setState({
      isFocused: false,
      showMenu: false
    });
  }

  onChange (value) {
    this.hideMenu();
    this.props.onChange(value);
  }

  getMenuStyles () {
    if (this.props.disabled || !this.state.isFocused) {
      return {};
    }

    return {
      bgColor: this.props.theme.palette.neutralBackground,
      borderColor: this.props.theme.palette.neutralBackground,
      borderBottomRadius: '0px'
    };
  }

  renderMenu () {
    const { children, ...rest } = this.props;
    if (this.mobileDetect.mobile() || this.mobileDetect.tablet()) {
      return (
        <FormControl
          {...rest}
          value={this.props.value}
          control="select"
          onFocus={this.onMenuClick}
          onBlur={this.hideMenu}
          onChange={this.onChange}
        >
          {this.renderNativeMenuItems()}
        </FormControl>
      );
    }

    return (
      <FormControl
        {...rest}
        value={this.props.value}
        control={'div'}
        onClick={this.onMenuClick}
        labelRight={<FontAwesome icon={ArrowDown} />}
      />
    );
  }

  renderThemedMenuItems () {
    const selected = (value) => { return this.props.value === value; };
    const items = this.props.children.map((item) => {
      return React.cloneElement(item, {
        onSelect: this.props.onChange,
        role: 'option',
        selected
      });
    });

    return (
      <PortalElement>
        <SelectFieldMenuOverlay
          show={this.state.showMenu}
          onClick={this.hideMenu}
        >
          <SelectFieldMenuWrapper
            width={this.state.menuWidth}
            top={this.state.menuTop}
            left={this.state.menuLeft}
            background={this.props.theme.palette.neutralBackground}
            borderColor={this.props.theme.palette.neutral}
          >
            {items}
          </SelectFieldMenuWrapper>
        </SelectFieldMenuOverlay>
      </PortalElement>
    );
  }

  renderNativeMenuItems () {
    return this.props.children.map((item) => {
      let value;
      if (!_.isEmpty(item.props.value)) {
        value = item.props.value;
      } else {
        value = item.props.text;
      }

      return (
        <option value={value}>{item.props.text}</option>
      );
    });
  }

  render () {
    return (
      <SelectFieldWrapper menuStyles={this.getMenuStyles()}>
        <div ref={(el) => { this.menuWrapperEl = el; }} style={{ display: 'inline-block' }}>
          {this.renderMenu()}
          {this.renderThemedMenuItems()}
        </div>
      </SelectFieldWrapper>
    );
  }
}

ThemedSelectField.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.arrayOf(MenuItem),
  disabled: PropTypes.bool
};

ThemedSelectField.defaultProps = {
  onChange: () => {},
  disabled: false
};

export default WithTheme(ThemedSelectField);
