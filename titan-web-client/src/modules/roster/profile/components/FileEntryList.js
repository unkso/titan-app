import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/es/Typography/Typography';
import dateFns from 'date-fns';
import FileEntry from 'titan/modules/roster/profile/components/FileEntry';
import Column from 'titan/components/Grid/Column';
import Row from 'titan/components/Grid/Row';

class FileEntryList extends React.Component {
  render () {
    let list = [];
    let prevDate = null;

    for (let x = 0; x < this.props.items.length; x++) {
      const date = new Date(this.props.items[x].start_date);
      const isNewMonth = (
        !prevDate ||
        date.getMonth() !== prevDate.getMonth() ||
        date.getFullYear() !== prevDate.getFullYear()
      );
      prevDate = date;

      if (isNewMonth) {
        list.push(
          <Row gutter={8}>
            <Column grow={1}>
              <Typography variant="h3">
                <span>{dateFns.format(this.props.items[x].start_date, 'MMMM YYYY')}</span>
              </Typography>
            </Column>
          </Row>
        );
      }

      list.push(
        <Row gutter={4}>
          <Column grow={1}>
            <FileEntry
              type={this.props.items[x].file_entry_type.name}
              date={this.props.items[x].start_date}>
              {this.props.items[x].comments}
            </FileEntry>
          </Column>
        </Row>
      );
    }

    return list;
  }
}

FileEntryList.propTypes = {
  items: PropTypes.object
};

export default FileEntryList;
