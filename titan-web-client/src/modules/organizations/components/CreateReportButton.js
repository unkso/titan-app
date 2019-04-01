import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { CreateReportForm } from 'titan/modules/organizations/components/CreateReportForm';
import Row from 'titan/components/Grid/Row';
import Column from 'titan/components/Grid/Column';
import { List } from 'titan/components/FileEntry/FileEntryList';

export class CreateReportButton extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      dialogOpen: false,
      fields: []
    };
  }

  openDialog () {
    this.setState({ dialogOpen: true });
  }

  closeDialog () {
    this.setState({ dialogOpen: false });
  }

  updateField (field, value) {
    this.setState({ [field]: value });
  }

  isFormValid () {
    return this.state.termStartDate && this.state.comments;
  }

  render () {
    return (
      <React.Fragment>
        <Button
          color="primary"
          onClick={() => this.openDialog()}
          variant="contained">Add Report</Button>
        <Dialog open={this.state.dialogOpen} maxWidth="lg" fullWidth>
          <DialogTitle>
            {this.props.organization.name} Weekly Report
          </DialogTitle>
          <DialogContent>
            <Row>
              <Column basis="60%">
                <CreateReportForm
                  fields={this.state.fields}
                  onFieldChange={(field, value) => this.updateField(field,
                    value)}
                />
              </Column>
              <Column basis="40%">
                <List items={[
                  {
                    file_entry_type: { name: 'practice' },
                    start_date: '2019-01-01',
                    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate lacus et ex posuere condimentum.',
                    modified_by: {
                      wcf: {
                        'id': 595,
                        'wcf_id': 5507,
                        'legacy_player_id': 11821,
                        'rank_id': 11168,
                        'username': 'mparsons',
                        'orientation': 18052,
                        'bct_e0': 18052,
                        'bct_e1': 18161,
                        'bct_e2': 18225,
                        'bct_e3': 18347,
                        'loa': null,
                        'a15': null,
                        'date_joined': '2016-12-17T00:00:00',
                        'last_activity': '2018-12-21T19:25:58',
                        'wcf': {
                          'avatar_url': 'https://clanunknownsoldiers.com/wcf/images/avatars/3f/634-3f7071d457cfc2666c3fb42cc7d93c3fadb64517-128.png',
                          'last_activity_time': 1529971747,
                          'user_title': 'Staff Sergeant (E-6)<br> NCOIC of Engineering',
                          'username': 'SSgt.mparsons=US='
                        }
                      }
                    }
                  },
                  {
                    file_entry_type: { name: 'practice' },
                    start_date: '2019-01-01',
                    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate lacus et ex posuere condimentum.',
                    modified_by: {
                      'id': 595,
                      'wcf_id': 5507,
                      'legacy_player_id': 11821,
                      'rank_id': 11168,
                      'username': 'mparsons',
                      'orientation': 18052,
                      'bct_e0': 18052,
                      'bct_e1': 18161,
                      'bct_e2': 18225,
                      'bct_e3': 18347,
                      'loa': null,
                      'a15': null,
                      'date_joined': '2016-12-17T00:00:00',
                      'last_activity': '2018-12-21T19:25:58',
                      'wcf': {
                        'avatar_url': 'https://clanunknownsoldiers.com/wcf/images/avatars/3f/634-3f7071d457cfc2666c3fb42cc7d93c3fadb64517-128.png',
                        'last_activity_time': 1529971747,
                        'user_title': 'Staff Sergeant (E-6)<br> NCOIC of Engineering',
                        'username': 'SSgt.mparsons=US='
                      }
                    }
                  },
                  {
                    file_entry_type: { name: 'practice' },
                    start_date: '2019-01-01',
                    comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate lacus et ex posuere condimentum.',
                    modified_by: {
                      'id': 595,
                      'wcf_id': 5507,
                      'legacy_player_id': 11821,
                      'rank_id': 11168,
                      'username': 'mparsons',
                      'orientation': 18052,
                      'bct_e0': 18052,
                      'bct_e1': 18161,
                      'bct_e2': 18225,
                      'bct_e3': 18347,
                      'loa': null,
                      'a15': null,
                      'date_joined': '2016-12-17T00:00:00',
                      'last_activity': '2018-12-21T19:25:58',
                      'wcf': {
                        'avatar_url': 'https://clanunknownsoldiers.com/wcf/images/avatars/3f/634-3f7071d457cfc2666c3fb42cc7d93c3fadb64517-128.png',
                        'last_activity_time': 1529971747,
                        'user_title': 'Staff Sergeant (E-6)<br> NCOIC of Engineering',
                        'username': 'SSgt.mparsons=US='
                      }
                    }
                  }
                ]} />
              </Column>
            </Row>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeDialog()}>Close</Button>
            <Button
              color="primary"
              disabled={!this.isFormValid()}
              onClick={() => this.closeDialog()}>Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

CreateReportButton.propsTypes = {
  organization: PropTypes.object
};
