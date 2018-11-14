import React from 'react';
import styled from 'styled-components';

export const ProfileBadgeAvatar = styled.div`
  width: 50px;
  height: 50px;
  background-color: #191919;
  background-size: cover;
  background-image: ${props => props.image}
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
`;

export const ProfileBadgeDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  flex: 1;
`;

export const ProfileBadgeUsername = styled.div`
  color: #fff;
`;

export const ProfileBadgeTitle = styled.div`
  color: #616161;
  font-size: .9rem;
  font-weight: 100;
  margin-top: 5px;
`;

export const ProfileBadge = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: row;
`;

class SidebarProfileBadge extends React.Component {
  render () {
    return (
      <ProfileBadge>
        <ProfileBadgeAvatar image={''} />
        <ProfileBadgeDetails>
          <ProfileBadgeUsername>Sgt.MParsons</ProfileBadgeUsername>
          <ProfileBadgeTitle>NCOIC of Engineering</ProfileBadgeTitle>
        </ProfileBadgeDetails>
      </ProfileBadge>
    );
  }
}

export default SidebarProfileBadge;
