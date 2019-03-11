import React from 'react';
import PropTypes from 'prop-types';
import OrganizationsService from 'titan/http/OrganizationsService';
import { ReportsList } from 'titan/components/Reports/ReportsList';
import { ContentBlock } from 'titan/components/block/ContentBlock';

export class Reports extends React.Component {
  constructor (props) {
    super(props);
    this.organizationsService = new OrganizationsService();
    this.state = {
      reports: []
    };
  }

  componentDidMount () {
    this.organizationsService.findReports(this.props.organizationId)
      .then(res => {
        this.setState({ reports: res.data });
      });
  }

  render () {
    return (
      <ContentBlock>
        <ReportsList items={this.state.reports} />
      </ContentBlock>
    );
  }
}

Reports.propTypes = {
  organizationId: PropTypes.number.isRequired
};
