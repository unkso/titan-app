import PropTypes from 'prop-types';
import styled from 'styled-components';

const Column = styled.div`
  width: ${props => props.basis};
  box-sizing: border-box;
  flex-grow: ${props => props.grow};
  flex-shrink: ${props => props.shrink};
  flex-basis: ${props => props.basis};
  
  @media (max-width: 1199px) {
    width: ${props => props.basisXl || props.basis};
    flex-basis: ${props => props.basisXl || props.basis};
  }
  
  @media (max-width: 991px) {
    width: ${props => props.basisLg || props.basis};
    flex-basis: ${props => props.basisLg || props.basis};
  }
  
  @media (max-width: 767px) {
    width: ${props => props.basisMd || props.basis};
    flex-basis: ${props => props.basisMd || props.basis};
  }
  
  @media (max-width: 479px) {
    width: ${props => props.basisSm || props.basis};
    flex-basis: ${props => props.basisSm || props.basis};
  }
`;
Column.propTypes = {
  grow: PropTypes.oneOf([0, 1, '0', '1', 'auto']),
  shrink: PropTypes.oneOf([0, 1, '0', '1', 'auto']),
  basis: PropTypes.string,
  basisSm: PropTypes.string,
  basisMd: PropTypes.string,
  basisLg: PropTypes.string,
  basisXl: PropTypes.string
};

Column.defaultProps = {
  grow: 'auto',
  shrink: 'auto',
  basis: 'auto',
  basisSm: null,
  basisMd: null,
  basisLg: null,
  basisXl: null
};

export default Column;
