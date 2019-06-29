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
          <ProfileLinkContainer />
          {/* <SidebarMenuItem */}
          {/* url={'/'} */}
          {/* label="Dashboard" */}
          {/* leftIcon={<FontAwesomeIcon icon="home" />} */}
          {/* isActive */}
          {/* /> */}
          <SidebarMenuItem
            url={'/organizations'}
            label="Organizations"
            leftIcon={<FontAwesomeIcon icon="flag" />}
          />
          {/* <SidebarMenuItem */}
          {/* url={'/'} */}
          {/* label="Events" */}
          {/* leftIcon={<FontAwesomeIcon icon="calendar-alt" />} */}
          {/* /> */}
          {/* <SidebarMenuItem */}
          {/* url={'/'} */}
          {/* label="Reports" */}
          {/* leftIcon={<FontAwesomeIcon icon="file-alt" />} */}
          {/* /> */}
          {/* <SidebarMenuItem */}
          {/* url={'/'} */}
          {/* label="Training" */}
          {/* leftIcon={<FontAwesomeIcon icon="graduation-cap" />} */}
          {/* /> */}
        </SidebarContentGroup>

        {/* <SidebarHeading>Administrative</SidebarHeading> */}

        {/* <SidebarContentGroup> */}
        {/* <SidebarMenuItem */}
        {/* url={'/'} */}
        {/* label="Members" */}
        {/* leftIcon={<FontAwesomeIcon icon="users" />} */}
        {/* /> */}
        {/* <SidebarMenuItem */}
        {/* url={'/'} */}
        {/* label="Awards" */}
        {/* leftIcon={<FontAwesomeIcon icon="trophy" />} */}
        {/* /> */}
        {/* <SidebarMenuItem */}
        {/* url={'https://clanunknownsoldiers.com'} */}
        {/* label="Forums" */}
        {/* leftIcon={<FontAwesomeIcon icon="newspaper" />} */}
        {/* /> */}
        {/* </SidebarContentGroup> */}

        {this.state.showLeadershipTools && (
          <React.Fragment>
            <SidebarHeading>Leadership Tools</SidebarHeading>
            <SidebarContentGroup>
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
            </SidebarContentGroup>
          </React.Fragment>
        )
        }

        <SidebarHeading>Account</SidebarHeading>

        <SidebarContentGroup>
          {/* <SidebarMenuItem */}
          {/* url={'/'} */}
          {/* label="Settings" */}
          {/* leftIcon={<FontAwesomeIcon icon="cog" />} */}
          {/* /> */}
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
