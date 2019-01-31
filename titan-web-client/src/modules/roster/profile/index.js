import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader
  from 'titan/layouts/dashboard/components/PageHeader/PageHeader';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import GeneralProfile
  from 'titan/modules/roster/profile/components/GeneralProfile';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import UsersService from 'titan/http/UsersService';
import * as profileActions from 'titan/actions/profileActions';
import FileEntryListContainer
  from 'titan/modules/roster/profile/containers/FileEntryListContainer';
import CreateFileEntryContainer
  from 'titan/modules/roster/profile/containers/CreateFileEntryContainer';
import Typography from '@material-ui/core/Typography/Typography';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tab: 0 };
    this.usersService = new UsersService();
    this.changeTabHandler = this.setTab.bind(this);
  }

  componentDidMount() {
    this.usersService.getUser(this.props.match.params.userId)
      .then((res) => {
        this.props.actions.profile.setUser(res.data);
      })
      .catch(() => {
        this.props.history.push('/roster');
      });
  }

  componentWillUnmount() {
    this.props.actions.profile.setUser(null);
  }

  setTab(event, index) {
    this.setState({ tab: index });
  }

  render() {
    if (!this.props.profile.user) {
      return null;
    }

    return (
      <div>
        <PageHeader>
          <CardHeader title={this.props.profile.user.wcf.username} />
          <Tabs value={this.state.tab} onChange={this.changeTabHandler}>
            <Tab label="General" />
            <Tab label="History" />
          </Tabs>
        </PageHeader>
        <ContentBlock>
          {this.state.tab === 0 && <GeneralProfile />}
          {this.state.tab === 1 && (
            <React.Fragment>
              <Typography align="right">
                <CreateFileEntryContainer />
              </Typography>
              <FileEntryListContainer />
            </React.Fragment>
          )}
        </ContentBlock>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.roster.profile
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: {
      profile: bindActionCreators(profileActions, dispatch)
    }
  };
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Profile));
