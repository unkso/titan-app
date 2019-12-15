import React from 'react';
import { connect } from 'react-redux';
import { Sidebar_menu_item } from './sidebar_menu_item';

function mapStateToProps (state) {
  return {
    auth: state.auth
  };
}

export const Profile_link_container = connect(mapStateToProps)((props) => {
  return (
    <Sidebar_menu_item
      url={`/roster/${props.auth.session.user.id}`}
      label="My Player"
      leftIcon={<span className="fas fa-user" />}
    />
  );
});
