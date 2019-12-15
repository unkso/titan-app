import React from '@titan/modules/organizations/components/organization_file_entry_detail_list';
import PropTypes from 'prop-types';
import OrganizationsService from '@titan/http/OrganizationsService';

export class Organization_file_entry_detail_list extends React.Component {
  constructor (props) {
    super(props);

    this.organizationsService = new OrganizationsService();
  }

  componentDidMount () {
    this.organizationsService.findChildrenIds();
  }

  render () {
    return null;
  }
}

Organization_file_entry_detail_list.propTypes = {
  organizationId: PropTypes.number
};
