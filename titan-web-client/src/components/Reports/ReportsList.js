import React from 'react';
import PropTypes from 'prop-types';
import { ChronologicalItemList } from 'titan/components/List/ChronologicalItemList';
import { ReportsListItem } from 'titan/components/Reports/ReportsListItem';

/**
 * Renders a list of reports grouped by month.
 */
export class ReportsList extends React.Component {
  render () {
    return (
      <ChronologicalItemList
        dateField="term_start_date"
        items={this.props.items}
        renderer={item => (
          <ReportsListItem report={item}>
            {item.comments}
          </ReportsListItem>
        )}
      />
    );
  }
}

ReportsList.propTypes = {
  /** A list of reports. */
  items: PropTypes.arrayOf(PropTypes.object)
};
