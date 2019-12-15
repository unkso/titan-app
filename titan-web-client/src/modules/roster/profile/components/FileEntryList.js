import React from 'react';
import PropTypes from 'prop-types';
import FileEntry from '@titan/modules/roster/profile/components/FileEntry';
import { ChronologicalItemList } from '@titan/components/List/ChronologicalItemList';

/**
 * A list of file entries grouped by month.
 */
export class FileEntryList extends React.Component {
  render () {
    return (
      <ChronologicalItemList
        dateField="start_date"
        items={this.props.items}
        renderer={item => (
          <FileEntry
            type={item.file_entry_type.name}
            date={item.start_date}>
            {item.comments}
          </FileEntry>
        )}
      />
    );
  }
}

FileEntryList.propTypes = {
  /** A list of file entries. */
  items: PropTypes.arrayOf(PropTypes.object)
};
