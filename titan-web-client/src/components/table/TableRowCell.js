import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WithTheme from '../core/WithTheme';

export const TableRowCellWrapper = styled.td`
  width: ${props => props.width};
  padding: 20px;
  margin: 0;
  
  ${props => !props.allowWrapping && `
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `}
`;

class TableRowCell extends React.Component {
  render() {
    return (
      <TableRowCellWrapper
        width={this.props.width}
        allowWrapping={this.props.allowWrapping}
      >
        {this.props.children}
      </TableRowCellWrapper>
    );
  }
}

TableRowCell.propTypes = {
  width: PropTypes.any,
  allowWrapping: PropTypes.bool,
  children: PropTypes.object
};

TableRowCell.defaultProps = {
  width: '100%',
  allowWrapping: false
};

export default WithTheme(TableRowCell);
