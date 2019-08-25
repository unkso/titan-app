import React from 'react';
import PropTypes from 'prop-types';
import { ChainOfCommand } from 'titan/modules/organizations/components/ChainOfCommand';
import OrganizationsService from 'titan/http/OrganizationsService';
import { IconEmptyState } from 'titan/components/EmptyStates/IconEmptyState';

export class OrganizationChainOfCommand extends React.Component {
  constructor (props) {
    super(props);

    this.organizationsService = new OrganizationsService();
    this.state = {
      extendedCoc: [],
      localCoc: []
    };
  }

  UNSAFE_componentWillMount () {
    this.loadOrganizationCoC(this.props.organizationId);
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.organizationId !== this.props.organizationId) {
      this.loadOrganizationCoC(this.props.organizationId);
    }
  }

  loadOrganizationCoC (organizationId) {
    this.organizationsService.findChainOfCommand(organizationId)
      .then(res => {
        this.setState({
          extendedCoc: res.data.extended_coc.reverse(),
          localCoc: res.data.local_coc.reverse()
        });
      });
  }

  render () {
    return (
      <React.Fragment>
        {this.state.extendedCoc.length || this.state.localCoc.length ? (
          <ChainOfCommand
            extendedCoc={this.state.extendedCoc}
            localCoc={this.state.localCoc}
          />
        ) : (
          <IconEmptyState
            icon="users"
            primaryText="There are no members in this organization's Chain of Command."
          />
        )}
      </React.Fragment>
    );
  }
}

OrganizationChainOfCommand.propTypes = {
  organizationId: PropTypes.number.isRequired
};
