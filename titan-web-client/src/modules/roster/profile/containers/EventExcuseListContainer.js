import React from 'react';
import { bindActionCreators } from 'redux';
import * as profileActions from 'titan/actions/profileActions';
import connect from 'react-redux/es/connect/connect';
import UsersService from 'titan/http/UsersService';
import CircularProgress
  from '@material-ui/core/CircularProgress/CircularProgress';
import { EventExcuseList }
  from 'titan/modules/roster/components/Excuse/EventExcuseList';
import { IconEmptyState } from 'titan/components/EmptyStates/IconEmptyState';

class EventExcuseListContainer extends React.Component {
  constructor (props) {
    super(props);

    this.usersService = new UsersService();
    this.state = { loading: true };
  }

  componentDidMount () {
    // If we have already loaded this user's excuses, don't attempt to
    // load them again.
    if (this.props.profile.excuses.length === 0) {
      this.usersService.listUserEventExcuses(this.props.profile.user.id)
        .then((res) => {
          this.props.actions.profile.setExcuses(res.data);
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

    if (this.props.profile.excuses.length === 0) {
      return (
        <IconEmptyState
          icon="clipboard-list"
          primaryText="This member hasn't submitted any excuses"
          verticalMargin={64}
        />
      );
    }

    return <EventExcuseList items={this.props.profile.excuses} />;
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
  EventExcuseListContainer
);
