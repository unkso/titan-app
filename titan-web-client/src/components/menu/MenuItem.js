import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WithTheme from '../core/WithTheme';

export const MenuItemWrapper = styled.div`
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.hoverBgColor};
  }
`;

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect() {
    const value = this.props.value ? this.props.value : this.props.text;
    this.props.onSelect(value);
  }

  render() {
    return (
      <MenuItemWrapper
        onClick={this.onSelect}
        hoverBgColor={this.props.theme.palette.neutral}
      >
        {this.props.text}
      </MenuItemWrapper>
    );
  }
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.any,
  onSelect: PropTypes.func,
  theme: PropTypes.object
};

MenuItem.defaultProps = {
  onSelect: () => {}
};

export default WithTheme(MenuItem);
