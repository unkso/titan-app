import React from 'react';
import styled from 'styled-components';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarHeading from './SidebarHeading';
import SidebarContentGroup from './SidebarContentGroup';
import SidebarProfileBadge from './SidebarProfileBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarWrapper = styled.nav`
  margin-top: 25px;
`;

class Sidebar extends React.Component {
  render () {
    return (
      <SidebarWrapper>
        <SidebarContentGroup>
          <SidebarProfileBadge />
        </SidebarContentGroup>

        <SidebarContentGroup>
          <SidebarMenuItem
            url={'/'}
            label="Dashboard"
            leftIcon={<FontAwesomeIcon icon="home" />}
            isActive
          />
          <SidebarMenuItem
            url={'/'}
            label="Branch"
            leftIcon={<FontAwesomeIcon icon="flag" />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Events"
            leftIcon={<FontAwesomeIcon icon="calendar-alt" />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Reports"
            leftIcon={<FontAwesomeIcon icon="file-alt" />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Training"
            leftIcon={<FontAwesomeIcon icon="graduation-cap" />}
          />
        </SidebarContentGroup>

        <SidebarHeading>Administrative</SidebarHeading>

        <SidebarContentGroup>
          <SidebarMenuItem
            url={'/'}
            label="Members"
            leftIcon={<FontAwesomeIcon icon="users" />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Awards"
            leftIcon={<FontAwesomeIcon icon="trophy" />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Forums"
            leftIcon={<FontAwesomeIcon icon="newspaper" />}
          />
        </SidebarContentGroup>

        <SidebarHeading>Account</SidebarHeading>

        <SidebarContentGroup>
          <SidebarMenuItem
            url={'/'}
            label="Settings"
            leftIcon={<FontAwesomeIcon icon="cog" />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Sign Out"
            leftIcon={<FontAwesomeIcon icon="power-off" />}
          />
        </SidebarContentGroup>
      </SidebarWrapper>
    );
  }
}

export default Sidebar;
