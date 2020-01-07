import React from 'react';
import { EventExcuseListItem } from './event_excuse_list_item';
import { ChronologicalItemList } from '@titan/components/list/chronological_item_list';

/**
 * Renders a list of excuses grouped by month.
 */
export function EventExcuseList (props) {
  return (
    <ChronologicalItemList
      dateField="event_date"
      items={props.items}
      renderer={item => (
        <EventExcuseListItem
          excuse={item}>
          {item.comments}
        </EventExcuseListItem>
      )}
    />
  );
}
