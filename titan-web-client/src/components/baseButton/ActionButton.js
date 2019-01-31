import React from 'react';
import PropTypes from 'prop-types';

class ActionButton extends React.Component {
  render() {
    if (this.props.href) {
      return (
        <a {...this.props} href={this.props.href}>
          {this.props.children}
        </a>
      );
    }

    return (
      <button {...this.props} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

ActionButton.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

ActionButton.defaultProps = {
  href: null,
  onClick: null,
  disabled: false
};

export default ActionButton;
