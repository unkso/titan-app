import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from './list_item';
import { ChronologicalItemList } from '../list/chronological_item_list';

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
