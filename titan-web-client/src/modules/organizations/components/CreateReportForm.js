import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui-pickers';

export class CreateReportForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <DatePicker
          label="Term Start Date"
          variant="outlined"
          value={this.props.fields.termStartDate}
          onChange={date => this.props.onFieldChange('termStartDate', date)}
        />
      </React.Fragment>
    );
  }
}

CreateReportForm.propTypes = {
  fields: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired
};
