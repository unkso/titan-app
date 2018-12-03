import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Row from 'titan/components/Grid/Row';
import Column from 'titan/components/Grid/Column';

class CreateFileEntryForm extends React.Component {
  render () {
    const startDateLabel = this.props.multiDate ? 'Start Date' : 'Date';
    const startDateKey = this.props.multiDate ? 'state-date' : 'date';
    return (
      <React.Fragment>
        <Row>
          <Column grow={1}>
            <DatePicker
              key={startDateKey}
              label={startDateLabel}
              variant="outlined"
              value={this.props.fields.startDate}
              onChange={(date) => this.props.onFieldChange('startDate', date)}
            />
          </Column>
          <Column grow={1}>
            {this.props.multiDate &&
            <DatePicker
              label="End date"
              variant="outlined"
              value={this.props.fields.endDate}
              onChange={(date) => this.props.onFieldChange('endDate', date)}
            />
            }
          </Column>
        </Row>
        <Row>
          <Column grow={1}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="File entry type"
              value={this.props.fields.fileEntryTypeIndex}
              onChange={(e) => this.props.onFieldChange(
                'fileEntryTypeIndex',
                e.target.value
              )}>
              {this.props.entryTypes.map((entryType, index) => {
                return (
                  <MenuItem key={index} value={index}>
                    {entryType.name}
                  </MenuItem>
                );
              })}
            </TextField>
          </Column>
        </Row>
        <Row>
          <Column grow={1}>
            <TextField
              rows={5}
              fullWidth
              multiline
              variant="outlined"
              label="Comments"
              value={this.props.fields.comments}
              onChange={(e) => this.props.onFieldChange('comments', e.target.value)}
            />
          </Column>
        </Row>
      </React.Fragment>
    );
  }
}

CreateFileEntryForm.propTypes = {
  multiDate: PropTypes.bool,
  entryTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired
};

CreateFileEntryForm.defaultProps = {
  multiDate: false
};

export default CreateFileEntryForm;
