import React from 'react';
import { DatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Row from 'titan/components/Grid/Row';
import Column from 'titan/components/Grid/Column';
import { format } from 'date-fns';
import { SlateEditor } from 'titan/components/slate/SlateEditor';
import { BOLD_MARK, ITALIC_MARK } from 'titan/components/slate/marks';
import { LINK_INLINE } from 'titan/components/slate/inline';

export function CreateReportForm (props) {
  return (
    <React.Fragment>
      <Row>
        <Column grow={1}>
          <DatePicker
            inputVariant="outlined"
            value={props.fields.termStartDate}
            label="Start of week"
            labelFunc={date => date ? format(date, 'eee, MM/dd/yyyy') : ''}
            onChange={date => props.onFieldChange('termStartDate', date)}
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
            value={props.fields.comments}
            onChange={e =>
              props.onFieldChange('comments', e.target.value)}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <SlateEditor
            marks={[BOLD_MARK, ITALIC_MARK]}
            inline={[LINK_INLINE]}
          />
        </Column>
      </Row>
    </React.Fragment>
  );
}
