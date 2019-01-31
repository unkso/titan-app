import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const ModalContentWrapper = styled.div`
  padding: 10px 20px;
`;

class ModalContent extends React.Component {
  render() {
    return (
      <ModalContentWrapper>
        {this.props.children}
      </ModalContentWrapper>
    );
  }
}

ModalContent.propTypes = {
  children: PropTypes.object
};

export default ModalContent;
