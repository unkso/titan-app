import React from 'react';
import styled from 'styled-components';
import { SidebarMenuItem } from './sidebar_menu_item';
import SidebarHeading from './sidebar_heading';
import SidebarContentGroup from './sidebar_content_group';
import SidebarProfileBadge from './sidebar_profile_badge';
import { ProfileLinkContainer } from './profile_link_container';
import { createAclInstanceFromSession } from '@titan/lib/acl';
import { connect } from 'react-redux';
import { Permission } from '@titan/lib/acl';
import {
  LIST_USERS_ROUTE,
  USER_EXCUSES_ROUTE
} from '@titan/modules/roster/routes';

const SidebarWrapper = styled.nav`
  margin-top: 25px;
`;

class Sidebar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      canCreateEvents: false,
      hasLeadershipRole: false
    };
  }

  componentDidMount () {
    const hasLeadershipRole = this.props.auth.session.roles &&
      this.props.auth.session.roles.length > 0;
    const canAckEventExcuse = hasLeadershipRole ||
      createAclInstanceFromSession(this.props.auth.session)
        .hasAclPermission(Permission.CAN_ACK_EVENT_EXCUSE);

    this.setState({
      canCreateEvents: canAckEventExcuse,
      hasLeadershipRole,
      showLeadershipTools: [canAckEventExcuse, hasLeadershipRole].some(
        hasPermission => hasPermission)
    });
  }

  render () {
    return (
      <SidebarWrapper>
        <SidebarContentGroup>
          <SidebarProfileBadge />
        </SidebarContentGroup>

        <SidebarContentGroup>
          <SidebarHeading>Community</SidebarHeading>
          <SidebarMenuItem
            url={LIST_USERS_ROUTE}
            label="Members"
            leftIcon={<span className="fas fa-users" />}
          />
          <SidebarMenuItem
            url={'/organizations'}
            label="Organizations"
            leftIcon={<span className="fas fa-flag" />}
          />

          {this.state.showLeadershipTools && (
            <React.Fragment>
              <SidebarHeading>Leadership Tools</SidebarHeading>
              {this.state.canCreateEvents &&
              <SidebarMenuItem
                url={USER_EXCUSES_ROUTE}
                label="Manage Excuses"
                leftIcon={<span className="fas fa-clipboard-list" />}
              />
              }
              {this.state.hasLeadershipRole &&
              <SidebarMenuItem
                url={'/organizations/reports/unacknowledged'}
                label="Manage Reports"
                leftIcon={<span className="fas fa-file-alt" />}
              />
              }
            </React.Fragment>
          )
          }

          <SidebarHeading>Links</SidebarHeading>
          <SidebarMenuItem
            isExternal
            url="https://clanunknownsoldiers.com"
            label="Forums"
            leftIcon={<span className="fal fa-external-link-square" />}
          />

          <SidebarHeading>Account</SidebarHeading>
          <ProfileLinkContainer />
          <SidebarMenuItem
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
