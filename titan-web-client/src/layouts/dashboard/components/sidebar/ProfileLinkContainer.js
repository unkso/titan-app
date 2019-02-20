import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarMenuItem } from './SidebarMenuItem';

function mapStateToProps (state) {
  return {
    auth: state.auth
  };
}

export const ProfileLinkContainer = connect(mapStateToProps)((props) => {
  return (
    <SidebarMenuItem
      url={`/roster/${props.auth.session.user.id}`}
      label="My Player"
      leftIcon={<FontAwesomeIcon icon="user" />}
    />
  );
});
