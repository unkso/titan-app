import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import Row from 'titan/components/Grid/Row';
import Column from 'titan/components/Grid/Column';
import { withSnackbar } from 'notistack';
import { format } from 'date-fns';

class CreateReportFormComponent extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Row>
          <Column grow={1}>
            <DatePicker
              value={this.props.fields.termStartDate}
              labelFunc={date => date ? format(date, 'eee, MM/dd/yyyy') : ''}
              onChange={date => this.props.onFieldChange('termStartDate', date)}
              variant="outlined"
            />
          </Column>
        </Row>
        <Row>
          <Column grow={1}>
            <TextField
              rows={14}
              fullWidth
              multiline
              variant="outlined"
              label="Comments"
              value={this.props.fields.comments}
              onChange={e =>
                this.props.onFieldChange('comments', e.target.value)}
            />
          </Column>
        </Row>
      </React.Fragment>
    );
  }
}

CreateReportFormComponent.propTypes = {
  fields: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired
};

export const CreateReportForm = withSnackbar(
  CreateReportFormComponent);
