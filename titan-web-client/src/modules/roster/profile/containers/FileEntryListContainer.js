import React from 'react';
import { bindActionCreators } from 'redux';
import * as profileActions from 'titan/actions/profileActions';
import connect from 'react-redux/es/connect/connect';
import UsersService from 'titan/http/UsersService';
import CircularProgress
  from '@material-ui/core/CircularProgress/CircularProgress';
import FileEntryList
  from 'titan/modules/roster/profile/components/FileEntryList';

class FileEntryListContainer extends React.Component {
  constructor (props) {
    super(props);

    this.usersService = new UsersService();
    this.state = { loading: true };
  }

  componentDidMount () {
    // If we have already loaded this user's file entries, don't attempt to
    // load them again.
    if (this.props.profile.file_entries.length === 0) {
      this.usersService.listUserFiles(this.props.profile.user.id)
        .then((res) => {
          this.props.actions.profile.setFileEntries(res.data.items);
          this.setState({ loading: false });
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render () {
    if (this.state.loading) {
      return <CircularProgress />;
    }

    return <FileEntryList items={this.props.profile.file_entries} />;
  }
}

function mapStateToProps (state) {
  return {
    profile: state.roster.profile
  };
}

function mapActionsToProps (dispatch) {
  return {
    actions: {
      profile: bindActionCreators(profileActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapActionsToProps)(
  FileEntryListContainer
);
