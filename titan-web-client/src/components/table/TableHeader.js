import React from 'react';
import PropTypes from 'prop-types';
import WithTheme from '../core/WithTheme';
import { TableRowWrapper } from './TableRow';
import { TableRowCellWrapper } from './TableRowCell';
import styled from 'styled-components';

export const TableHeaderWrapper = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: ${props => props.bgColor};
`;

export const TableHeaderInnerWrapper = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

export const TableHeaderRow = TableRowWrapper.extend`
  border-bottom: none;
  background-color: transparent;
  z-index: 1;

  &:hover {
    background-color: transparent;
    box-shadow: none;
  }
  
  ${TableRowCellWrapper} {
    font-weight: 500;
    border: none;
  }
`;

class TableHeader extends React.Component {
  render () {
    const bgColor = this.props.theme.palette.neutral;
    return (
      <TableHeaderWrapper bgColor={bgColor}>
        <TableHeaderInnerWrapper>
          <tbody>
            <TableHeaderRow>
              {this.props.children}
            </TableHeaderRow>
          </tbody>
        </TableHeaderInnerWrapper>
      </TableHeaderWrapper>
    );
  }
}

TableHeader.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.object
};

export default WithTheme(TableHeader);
