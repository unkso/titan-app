import React from 'react';
import styled from 'styled-components';
import { Sidebar_menu_item } from './sidebar_menu_item';
import Sidebar_heading from './sidebar_heading';
import SidebarContentGroup from './sidebar_content_group';
import Sidebar_profile_badge from './sidebar_profile_badge';
import { Profile_link_container } from './profile_link_container';
import { createAclInstanceFromSession } from '@titan/lib/acl';
import { connect } from 'react-redux';
import { LIST_USERS_ROUTE } from '@titan/routes';

const SidebarWrapper = styled.nav`
  margin-top: 25px;
`;

class Sidebar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      canCreateEvents: false,
      canAckReports: false
    };
  }

  componentDidMount () {
    const canCreateEvents = createAclInstanceFromSession(this.props.auth.session)
      .canAccess(['mod.titan:canAckEventExcuse'], {
        userId: this.props.auth.session.user.id
      });
    const canAckReports = this.props.auth.session.roles &&
      this.props.auth.session.roles.length > 0;

    this.setState({
      canCreateEvents,
      canAckReports,
      showLeadershipTools: [canCreateEvents, canAckReports].some(
        hasPermission => hasPermission)
    });
  }

  render () {
    return (
      <SidebarWrapper>
        <SidebarContentGroup>
          <Sidebar_profile_badge />
        </SidebarContentGroup>

        <SidebarContentGroup>
          <Sidebar_heading>Community</Sidebar_heading>
          <Sidebar_menu_item
            url={LIST_USERS_ROUTE}
            label="Members"
            leftIcon={<span className="fas fa-users" />}
          />
          <Sidebar_menu_item
            url={'/organizations'}
            label="Organizations"
            leftIcon={<span className="fas fa-flag" />}
          />

          {this.state.showLeadershipTools && (
            <React.Fragment>
              <Sidebar_heading>Leadership Tools</Sidebar_heading>
              {this.state.canCreateEvents &&
              <Sidebar_menu_item
                url={'/roster/excuses'}
                label="Manage Excuses"
                leftIcon={<span className="fas fa-clipboard-list" />}
              />
              }
              {this.state.canAckReports &&
              <Sidebar_menu_item
                url={'/organizations/unacknowledged-reports'}
                label="Manage Reports"
                leftIcon={<span className="fas fa-file-alt" />}
              />
              }
            </React.Fragment>
          )
          }

          <Sidebar_heading>Links</Sidebar_heading>
          <Sidebar_menu_item
            isExternal
            url="https://clanunknownsoldiers.com"
            label="Forums"
            leftIcon={<span className="fal fa-external-link-square" />}
          />

          <Sidebar_heading>Account</Sidebar_heading>
          <Profile_link_container />
          <Sidebar_menu_item
            url={'/auth/logout'}
            label="Sign Out"
            leftIcon={<span className="fas fa-power-off" />}
          />
        </SidebarContentGroup>
      </SidebarWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Sidebar);
