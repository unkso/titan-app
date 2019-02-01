import React from 'react';
import PropTypes from 'prop-types';

const ELEMENTS = {
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'h6': 'h6',
  'p': 'p',
  'span': 'text',
  'div': 'text'
};

/**
 * @deprecated
 */
class Typography extends React.Component {
  render () {
    const Component = ELEMENTS[this.props.element];

    return (
      <Component style={{ ...this.props.style }}>
        {this.props.children}
      </Component>
    );
  }
}

Typography.propTypes = {
  element: PropTypes.string,
  theme: PropTypes.object,
  children: PropTypes.object
};

Typography.defaultProps = {
  element: 'span'
};

export default Typography;
