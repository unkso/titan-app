import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import { format as formatDate } from 'date-fns';
import Column from 'titan/components/Grid/Column';
import Row from 'titan/components/Grid/Row';
import { EventExcuseListItem } from './EventExcuseListItem';

export class EventExcuseList extends React.Component {
  render () {
    let list = [];
    let prevDate = null;

    for (let x = 0; x < this.props.items.length; x++) {
      const key = this.props.items[x].id;
      const date = new Date(this.props.items[x].event_date);
      const isNewMonth = (
        !prevDate ||
        date.getMonth() !== prevDate.getMonth() ||
        date.getFullYear() !== prevDate.getFullYear()
      );
      prevDate = date;

      if (isNewMonth) {
        list.push(
          <Row key={`month-title-${key}`} gutter={8}>
            <Column grow={1}>
              <Typography variant="h3">
                <span>{formatDate(this.props.items[x].event_date, 'MMMM yyyy')}</span>
              </Typography>
            </Column>
          </Row>
        );
      }

      list.push(
        <Row key={`excuse-${key}`} gutter={4}>
          <Column grow={1}>
            <EventExcuseListItem
              excuse={this.props.items[x]}>
              {this.props.items[x].comments}
            </EventExcuseListItem>
          </Column>
        </Row>
      );
    }

    return list;
  }
}

EventExcuseList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};
