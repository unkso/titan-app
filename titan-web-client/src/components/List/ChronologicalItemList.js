import React from 'react';
import PropTypes from 'prop-types';
import { format as formatDate } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import Column from 'titan/components/Grid/Column';
import Row from 'titan/components/Grid/Row';

/**
 * Renders a list of items grouped by some duration of time. The most
 * recent items will appear at the top. For now, only grouping by
 * month is supported.
 *
 * {@code
 * const events = [
 *   {title: 'Feb Event', event_date: '2019-02-01'},
 *   {title: 'Jan Event', event_date: '2019-01-01'},
 *   ...
 * ];
 *
 * return (
 *   <ChronologicalItemList
 *     dateField="event_date"
 *     items={events}
 *     renderer={item => (
 *       <p>{item.title} will take place on {item.event_date}.</p>
 *     )}
 *   />
 * );
 * }
 */
export class ChronologicalItemList extends React.Component {
  /**
   * Returns true if the two dates take place in different months.
   * @returns {boolean}
   */
  isNewMonth (prevDate, date) {
    return !prevDate ||
      date.getMonth() !== prevDate.getMonth() ||
      date.getFullYear() !== prevDate.getFullYear();
  }

  render () {
    let list = [];
    let prevDate = null;

    for (let x = 0; x < this.props.items.length; x++) {
      const key = this.props.items[x].id;
      const date = new Date(
        this.props.items[x][this.props.dateField]);
      const isNewMonth = this.isNewMonth(prevDate, date);
      prevDate = date;

      if (isNewMonth) {
        list.push(
          <Row key={`crl-title-${key}`} gutter={8}>
            <Column grow={1}>
              <Typography variant="h3">
                {formatDate(
                  new Date(this.props.items[x][this.props.dateField]),
                  'MMMM yyyy')}
              </Typography>
            </Column>
          </Row>
        );
      }

      list.push(
        <Row key={`cil-item-${key}`} gutter={4}>
          <Column grow={1}>
            {this.props.renderer(this.props.items[x])}
          </Column>
        </Row>
      );
    }

    return list;
  }
}

ChronologicalItemList.propTypes = {
  /**
   * A property inside of {@link this.props.items} containing a date
   * value. The value of this field will be compared with other items
   * to determine where one date group ends and the next begins.
   */
  dateField: PropTypes.string.isRequired,

  /** A list of records to render. */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** A function that renders the template for a list item. */
  renderer: PropTypes.func.isRequired
};
