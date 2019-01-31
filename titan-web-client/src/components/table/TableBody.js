import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WithTheme from '../core/WithTheme';

export const TableBodyOuterWrapper = styled.div``;

export const TableBodyInnerWrapper = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

class TableBody extends React.Component {
  render() {
    return (
      <TableBodyOuterWrapper>
        <TableBodyInnerWrapper>
          <tbody>
            {this.props.children}
          </tbody>
        </TableBodyInnerWrapper>
      </TableBodyOuterWrapper>
    );
  }
}

TableBody.propTypes = {
  children: PropTypes.object
};

export default WithTheme(TableBody);
