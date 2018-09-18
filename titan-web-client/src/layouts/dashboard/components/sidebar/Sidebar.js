import React from 'react'
import styled from 'styled-components'
import SidebarMenuItem from './SidebarMenuItem'
import SidebarHeading from './SidebarHeading'
import SidebarContentGroup from './SidebarContentGroup'
import SidebarProfileBadge from './SidebarProfileBadge'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'
import faFlag from '@fortawesome/fontawesome-free-solid/faFlag'
import faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt'
import faFileAlt from '@fortawesome/fontawesome-free-solid/faFileAlt'
import faGraduationCap from '@fortawesome/fontawesome-free-solid/faGraduationCap'
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers'
import faTrophy from '@fortawesome/fontawesome-free-solid/faTrophy'
import faNewspaper from '@fortawesome/fontawesome-free-solid/faNewspaper'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'
import faPowerOff from '@fortawesome/fontawesome-free-solid/faPowerOff'

const SidebarWrapper = styled.nav`
  margin-top: 25px;
`

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
            leftIcon={<FontAwesomeIcon icon={faHome} />}
            isActive
          />
          <SidebarMenuItem
            url={'/'}
            label="Branch"
            leftIcon={<FontAwesomeIcon icon={faFlag} />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Events"
            leftIcon={<FontAwesomeIcon icon={faCalendarAlt} />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Reports"
            leftIcon={<FontAwesomeIcon icon={faFileAlt} />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Training"
            leftIcon={<FontAwesomeIcon icon={faGraduationCap} />}
          />
        </SidebarContentGroup>

        <SidebarHeading>Administrative</SidebarHeading>

        <SidebarContentGroup>
          <SidebarMenuItem
            url={'/'}
            label="Members"
            leftIcon={<FontAwesomeIcon icon={faUsers} />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Awards"
            leftIcon={<FontAwesomeIcon icon={faTrophy} />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Forums"
            leftIcon={<FontAwesomeIcon icon={faNewspaper} />}
          />
        </SidebarContentGroup>

        <SidebarHeading>Account</SidebarHeading>

        <SidebarContentGroup>
          <SidebarMenuItem
            url={'/'}
            label="Settings"
            leftIcon={<FontAwesomeIcon icon={faCog} />}
          />
          <SidebarMenuItem
            url={'/'}
            label="Sign Out"
            leftIcon={<FontAwesomeIcon icon={faPowerOff} />}
          />
        </SidebarContentGroup>
      </SidebarWrapper>
    )
  }
}

export default Sidebar
