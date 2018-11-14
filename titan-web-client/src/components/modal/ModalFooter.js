import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WithTheme from '../core/WithTheme';

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  border-top: ${props => props.borderColor};
  justify-content: flex-end;
`;

class ModalFooter extends React.Component {
  render () {
    return (
      <FooterWrapper borderColor={this.props.theme.palette.neutral}>
        {this.props.children}
      </FooterWrapper>
    );
  }
}

ModalFooter.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.object
};

export default WithTheme(ModalFooter);
