import React from 'react';
import PropTypes from 'prop-types';
import OrganizationsService from '@titan/http/OrganizationsService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { IconEmptyState } from '@titan/components/empty_state/icon_empty_state';
import { MemberNameTag } from '@titan/components/members/member_name_tag';

export class List_support_leadership extends React.Component {
  constructor (props) {
    super(props);
    this.state = { roles: [] };
    this.organizationsService = new OrganizationsService();
  }

  componentDidMount () {
    this.loadSupportLeadership();
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.organizationId !== this.props.organizationId) {
      this.loadSupportLeadership();
    }
  }

  loadSupportLeadership () {
    this.organizationsService.findUnrankedRoles(this.props.organizationId)
      .then(res => {
        this.setState({ roles: res.data });
      });
  }

  render () {
    return (
      <React.Fragment>
        {this.state.roles.length > 0 ? (
          <List>
            {this.state.roles.map((role, index) => (
              <ListItem key={index}>
                <MemberNameTag
                  avatarUrl={role.user_profile.wcf.avatar_url}
                  avatarPosition="left"
                  label={role.role}
                  labelPosition="below"
                  username={role.user_profile.wcf.username}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <IconEmptyState
            icon="life-ring"
            primaryText="No active support roles" />
        )}
      </React.Fragment>
    );
  }
}

List_support_leadership.propTypes = {
  organizationId: PropTypes.number.isRequired
};
