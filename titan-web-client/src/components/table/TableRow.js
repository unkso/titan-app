import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WithTheme from '../core/WithTheme';

export const TableRowWrapper = styled.tr`
  border-bottom: 1px solid #e1e1e1;
  -webkit-transition: box-shadow 300ms ease-in-out;
  -moz-transition: box-shadow 300ms ease-in-out;
  -ms-transition: box-shadow 300ms ease-in-out;
  -o-transition: box-shadow 300ms ease-in-out;
  transition: box-shadow 300ms ease-in-out;

  &:hover {
    background-color: #f7f7f7;
    box-shadow: 0 0 61px -14px rgba(0,0,0,0.2);
  }
`;

class TableRow extends React.Component {
  render () {
    return (
      <TableRowWrapper>{this.props.children}</TableRowWrapper>
    );
  }
}

TableRow.propTypes = {
  children: PropTypes.object
};

export default WithTheme(TableRow);
