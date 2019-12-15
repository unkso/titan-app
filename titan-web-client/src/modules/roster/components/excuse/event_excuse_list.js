import React from 'react';
import PropTypes from 'prop-types';
import { Event_excuse_list_item } from './event_excuse_list_item';
import { ChronologicalItemList } from '@titan/components/list/chronological_item_list';

/**
 * Renders a list of excuses grouped by month.
 */
export class EventExcuseList extends React.Component {
  render () {
    return (
      <ChronologicalItemList
        dateField="event_date"
        items={this.props.items}
        renderer={item => (
          <Event_excuse_list_item
            excuse={item}>
            {item.comments}
          </Event_excuse_list_item>
        )}
      />
    );
  }
}

EventExcuseList.propTypes = {
  /** A list of event excuses. */
  items: PropTypes.arrayOf(PropTypes.object)
};
