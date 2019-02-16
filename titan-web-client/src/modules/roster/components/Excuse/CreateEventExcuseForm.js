import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Row from 'titan/components/Grid/Row';
import Column from 'titan/components/Grid/Column';

export class CreateEventExcuseForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Row>
          <Column grow={1}>
            <DatePicker
              label="Event Date"
              variant="outlined"
              value={this.props.fields.eventDate}
              onChange={date => this.props.onFieldChange('eventDate', date)}
            />
          </Column>
        </Row>
        <Row>
          <Column grow={1}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="Event type"
              value={this.props.fields.eventTypeId}
              onChange={e => this.props.onFieldChange(
                'eventTypeId',
                e.target.value
              )}>
              {this.props.eventTypes.map((type, index) => {
                return (
                  <MenuItem key={index} value={type.id}>{type.name}</MenuItem>
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

CreateEventExcuseForm.propTypes = {
  eventTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired
};
