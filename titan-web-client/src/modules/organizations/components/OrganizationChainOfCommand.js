import React from 'react';
import PropTypes from 'prop-types';
import { ChainOfCommand } from 'titan/modules/organizations/components/ChainOfCommand';
import OrganizationsService from 'titan/http/OrganizationsService';

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
          extendedCoc: res.data.extended_coc,
          localCoc: res.data.local_coc
        });
      });
  }

  render () {
    return (
      <ChainOfCommand
        extendedCoc={this.state.extendedCoc.reverse()}
        localCoc={this.state.localCoc.reverse()}
      />
    );
  }
}

OrganizationChainOfCommand.propTypes = {
  organizationId: PropTypes.number.isRequired
};
