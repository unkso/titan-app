import PropTypes from 'prop-types';
import styled from 'styled-components';
import Column from './Column';

const Row = styled.div`
  align-content: ${props => props.alignItems};
  align-items: ${props => props.alignItems};
  display: flex;
  flex-direction: ${props => props.direction};
  flex-wrap: ${props => props.wrap};
  justify-content: ${props => props.justifyContent};
  
  ${Column} {
    padding: ${props => props.gutter}px;
  }
`;
Row.propTypes = {
  direction: PropTypes.oneOf(['row', 'column']),
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  alignContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']),
  alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'])
};

Row.defaultProps = {
  gutter: 8,
  direction: 'row',
  wrap: 'nowrap',
  justifyContent: 'flex-start',
  alignContent: 'stretch',
  alignItems: 'stretch'
};

export default Row;
