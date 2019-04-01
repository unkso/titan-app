import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from './ListItem';
import { ChronologicalItemList } from '../List/ChronologicalItemList';

/**
 * A list of file entries grouped by month.
 */
export class List extends React.Component {
  render () {
    return (
      <ChronologicalItemList
        dateField="start_date"
        items={this.props.items}
        renderer={item => (
          <ListItem entry={item} />
        )}
      />
    );
  }
}

List.propTypes = {
  /** A list of file entries. */
  items: PropTypes.arrayOf(PropTypes.object)
};
