import React from 'react';
import PropTypes from 'prop-types';
import { EventExcuseListItem } from './EventExcuseListItem';
import { ChronologicalItemList } from '@titan/components/List/ChronologicalItemList';

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
          <EventExcuseListItem
            excuse={item}>
            {item.comments}
          </EventExcuseListItem>
        )}
      />
    );
  }
}

EventExcuseList.propTypes = {
  /** A list of event excuses. */
  items: PropTypes.arrayOf(PropTypes.object)
};
