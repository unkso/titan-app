import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PortalElement from '../portal/PortalElement';

export const ModalContentWrapper = styled.div`
  width: ${props => props.fullScreen ? '100%' : props.width};
  height: ${props => props.fullScreen ? '100%' : 'auto'};
  max-height: ${props => props.fullScreen ? '100%' : '80%'};
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  background: #fff;
  overflow-x: hidden;
  transform: translateY(-50px);
  opacity: 0;
  -webkit-transition: all 200ms ease-in-out;
  -moz-transition: all 200ms ease-in-out;
  -o-transition: all 200ms ease-in-out;
  transition-property: transform, opacity;
  -webkit-box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
                      0 24px 38px 3px rgba(0, 0, 0, 0.14),
                      0 9px 46px 8px rgba(0, 0, 0, 0.12);
`;

export const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.0);
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  display: flex;
  z-index: 0;
  -webkit-transition: all 300ms ease-in-out;
  -moz-transition: all 300ms ease-in-out;
  -o-transition: all 300ms ease-in-out;
  
  &.open {
    visibility: visible;
    background: rgba(0, 0, 0, 0.5);
  
    ${ModalContentWrapper} {
      transform: translateY(0);
      opacity: 1.0;
    }
  }
`;

const modalWidths = {
  'sm': '400px',
  'md': '600px',
  'lg': '800px',
  'xl': '1000px'
};

class Modal extends React.Component {
  render() {
    let size = this.props.size;

    if (!modalWidths[this.props.size]) {
      size = 'md';
      console.warn(`The value ${this.props.size} is not a valid modal size. Must be one of sm, md, lg, xl`);
    }

    let overlayClass = this.props.open ? 'open' : '';

    return (
      <PortalElement>
        <ModalOverlay open={this.props.open} className={overlayClass}>
          <ModalContentWrapper width={modalWidths[size]} fullScreen={this.props.fullScreen}>
            {this.props.children}
          </ModalContentWrapper>
        </ModalOverlay>
      </PortalElement>
    );
  }
}

Modal.propTypes = {
  size: PropTypes.string,
  fullScreen: PropTypes.bool,
  open: PropTypes.bool,
  children: PropTypes.object
};

Modal.defaultProps = {
  size: 'md',
  fullScreen: false,
  open: false
};

export default Modal;
