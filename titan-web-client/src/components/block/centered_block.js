import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const CenteredBlockStyle = styled.div`
  height: 100%;
  background: #e1e1e1;
  justify-content: center;
  display: flex;
`;

export const CenteredBlockContentStyle = styled.div`
  width: ${props => props.width};
  display: flex;
  align-self: center;
  position: relative;
  top: -10%;
`;

class CenteredBlock extends React.Component {
  render () {
    return (
      <CenteredBlockStyle>
        <CenteredBlockContentStyle width={this.props.width}>
          {this.props.children}
        </CenteredBlockContentStyle>
      </CenteredBlockStyle>
    );
  }
}

CenteredBlock.propTypes = {
  width: PropTypes.string,
  children: PropTypes.object
};

CenteredBlock.defaultProps = {
  width: '60%'
};

export default CenteredBlock;
