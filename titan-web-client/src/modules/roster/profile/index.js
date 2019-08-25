import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader
  from 'titan/layouts/dashboard/components/PageHeader/PageHeader';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import UsersService from 'titan/http/UsersService';
import * as profileActions from 'titan/actions/profileActions';
import FileEntryListContainer
  from 'titan/modules/roster/profile/containers/FileEntryListContainer';
import CreateFileEntryContainer
  from 'titan/modules/roster/profile/containers/CreateFileEntryContainer';
import Typography from '@material-ui/core/Typography/Typography';
import CreateEventExcuseContainer
  from 'titan/modules/roster/profile/containers/CreateEventExcuseContainer';
import EventExcuseListContainer
  from 'titan/modules/roster/profile/containers/EventExcuseListContainer';
import { createAclInstanceFromSession } from 'titan/lib/acl';

class Profile extends React.Component {
  constructor (props) {
    super(props);

    this.state = { tab: 0 };
    this.usersService = new UsersService();
  }

  componentDidMount () {
    this.props.actions.profile.clearUser();
    this.loadUser(this.props.match.params.userId);
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.setTab(0);
      this.props.actions.profile.clearUser();
      this.loadUser(this.props.match.params.userId);
    }
  }

  componentWillUnmount () {
    this.props.actions.profile.clearUser();
  }

  loadUser (userId) {
    this.usersService.getUser(userId)
      .then((res) => {
        this.props.actions.profile.setUser(res.data);
      })
      .catch(() => {
        this.props.history.push('/roster');
      });
  }

  setTab (index) {
    this.setState({ tab: index });
  }

  render () {
    if (!this.props.profile.user) {
      return null;
    }

    const canAccessExcuses =
      createAclInstanceFromSession(this.props.auth.session)
        .canAccess(['mod.titan:canCreateEventExcuse'], {
          userId: this.props.profile.user.id,
          mustHaveOptions: false
        });

    const headerTabs = [<Tab key={0} label="History" />];

    if (canAccessExcuses) {
      headerTabs.push(
        <Tab
          key={1}
          label="Excuses"
          onChange={() => this.setTab(1)} />
      );
    }

    return (
      <div key={this.props.profile.user.id}>
        <PageHeader>
          <CardHeader title={this.props.profile.user.wcf.username} />
          <Tabs value={this.state.tab} onChange={(e, i) => this.setTab(i)}>
            { headerTabs }
          </Tabs>
        </PageHeader>
        <ContentBlock>
          {this.state.tab === 0 && (
            <React.Fragment>
              <Typography align="right">
                <CreateFileEntryContainer />
              </Typography>
              <FileEntryListContainer />
            </React.Fragment>
          )}

          {this.state.tab === 1 && (
            <React.Fragment>
              <Typography align="right">
                <CreateEventExcuseContainer />
              </Typography>
              <EventExcuseListContainer />
            </React.Fragment>
          )}
        </ContentBlock>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
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

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(Profile));
