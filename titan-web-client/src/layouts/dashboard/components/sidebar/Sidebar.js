import React from 'react';
import styled from 'styled-components';
import { SidebarMenuItem } from './SidebarMenuItem';
import SidebarHeading from './SidebarHeading';
import SidebarContentGroup from './SidebarContentGroup';
import SidebarProfileBadge from './SidebarProfileBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileLinkContainer } from './ProfileLinkContainer';
import { createAclInstanceFromSession } from 'titan/lib/acl';
import { connect } from 'react-redux';
import { LIST_USERS_ROUTE } from 'titan/routes';

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
          <SidebarProfileBadge />
        </SidebarContentGroup>

        <SidebarContentGroup>
          <SidebarHeading>Community</SidebarHeading>
          <SidebarMenuItem
            url={LIST_USERS_ROUTE}
            label="Members"
            leftIcon={<FontAwesomeIcon icon="users" />}
          />
          <SidebarMenuItem
            url={'/organizations'}
            label="Organizations"
            leftIcon={<FontAwesomeIcon icon="flag" />}
          />

          {this.state.showLeadershipTools && (
            <React.Fragment>
              <SidebarHeading>Leadership Tools</SidebarHeading>
              {this.state.canCreateEvents &&
              <SidebarMenuItem
                url={'/roster/excuses'}
                label="Manage Excuses"
                leftIcon={<FontAwesomeIcon icon="clipboard-list" />}
              />
              }
              {this.state.canAckReports &&
              <SidebarMenuItem
                url={'/organizations/unacknowledged-reports'}
                label="Manage Reports"
                leftIcon={<FontAwesomeIcon icon="file-alt" />}
              />
              }
            </React.Fragment>
          )
          }

          <SidebarHeading>Account</SidebarHeading>
          <ProfileLinkContainer />
          <SidebarMenuItem
            url={'/auth/logout'}
            label="Sign Out"
            leftIcon={<FontAwesomeIcon icon="power-off" />}
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
