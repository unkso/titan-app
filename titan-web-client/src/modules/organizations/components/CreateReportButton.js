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
import UsersService from 'titan/http/UsersService';
import { List } from 'titan/components/FileEntry/List';
import styled from 'styled-components';
import OrganizationsService from 'titan/http/OrganizationsService';

const EntryListColumn = styled.div`
  height: 380px;
  overflow: auto;
  padding-bottom: 8px;
`;

export class CreateReportButton extends React.Component {
  constructor (props) {
    super(props);

    this.usersService = new UsersService();
    this.organizationsService = new OrganizationsService();
    this.state = {
      dialogOpen: false,
      fields: {}
    };
  }

  componentDidMount () {
    // TODO Search file entries every time date changes.
    this.usersService.searchFileEntries({
      organizations: `${this.props.organization.id}`
    }).then(res => {
      console.log(res.data);
    });
  }

  openDialog () {
    this.setState({ dialogOpen: true });
  }

  closeDialog () {
    this.setState({ dialogOpen: false });
  }

  updateField (field, value) {
    this.setState({
      fields: { ...this.state.fields, [field]: value }
    });
  }

  isFormValid () {
    return !!this.state.fields.termStartDate &&
      !!this.state.fields.comments;
  }

  save () {
    // TODO rename to indicate saving draft.
    this.organizationsService.saveReport(this.props.organization.id, {
      comments: this.state.comments,
      term_start_date: this.state.fields.termStartDate
    }).then(() => {
      // TODO add to list of reports.
      this.props.enqueueSnackbar('Excuse added', { variant: 'success' });
      this.closeDialog();
    }).catch(() => {
      this.props.enqueueSnackbar('Unable to save draft report', {
        variant: 'error',
        action: (<Button size="small">Dismiss</Button>)
      });
    });
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
                <EntryListColumn>
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
                    }
                  ]} />
                </EntryListColumn>
              </Column>
            </Row>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeDialog()}>Close</Button>
            <Button
              color="primary"
              disabled={!this.isFormValid()}
              onClick={() => this.save()}>Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

CreateReportButton.propsTypes = {
  organization: PropTypes.object
};
