import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const ContentBlock = styled.div`
  padding: 20px 50px;
`;

class Block extends React.Component {
  render() {
    return (
      <ContentBlock>
        {this.props.children}
      </ContentBlock>
    );
  }
}

Block.propTypes = {
  children: PropTypes.object
};

export default Block;
