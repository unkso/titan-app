import React from 'OrganizationFileEntryDetailList';
import PropTypes from 'prop-types';
import OrganizationsService from 'titan/http/OrganizationsService';

export class OrganizationFileEntryDetailList extends React.Component {
  constructor (props) {
    super(props);

    this.organizationsService = new OrganizationsService();
  }

  componentDidMount () {
    this.organizationsService.findChildrenIds();
  }

  render () {
    return ();
  }
}

OrganizationFileEntryDetailList.propTypes = {
  organizationId: PropTypes.number
};
