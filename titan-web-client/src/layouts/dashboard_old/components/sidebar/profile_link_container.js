import React from 'react';
import { connect } from 'react-redux';
import { SidebarMenuItem } from './sidebar_menu_item';

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
      leftIcon={<span className="fas fa-user" />}
    />
  );
});
