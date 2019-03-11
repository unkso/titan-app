import React from 'react';
import styled from 'styled-components';
import { SidebarMenuItem } from './SidebarMenuItem';
import SidebarHeading from './SidebarHeading';
import SidebarContentGroup from './SidebarContentGroup';
import SidebarProfileBadge from './SidebarProfileBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileLinkContainer } from './ProfileLinkContainer';
import { WithAcl } from 'titan/components/Acl/WithAcl';

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

        <WithAcl
          options={['mod.titan:canAckEventExcuse']}
          mustHaveAllOptions={false}>
          <SidebarHeading>Leadership Tools</SidebarHeading>
          <SidebarContentGroup>
            <WithAcl options={['mod.titan:canAckEventExcuse']}>
              <SidebarMenuItem
                url={'/roster/excuses'}
                label="Manage Excuses"
                leftIcon={<FontAwesomeIcon icon="clipboard-list" />}
              />
            </WithAcl>
          </SidebarContentGroup>
        </WithAcl>

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

export default Sidebar;
