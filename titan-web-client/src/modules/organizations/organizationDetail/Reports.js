import React from 'react';
import PropTypes from 'prop-types';
import OrganizationsService from 'titan/http/OrganizationsService';
import { ReportsList } from 'titan/components/Reports/ReportsList';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import Typography from '@material-ui/core/Typography';
import { CreateReportButton } from 'titan/modules/organizations/components/CreateReportButton';

export class Reports extends React.Component {
  constructor (props) {
    super(props);
    this.organizationsService = new OrganizationsService();
    this.state = {
      reports: []
    };
  }

  componentDidMount () {
    this.organizationsService.findReports(this.props.organization.id)
      .then(res => {
        this.setState({ reports: res.data });
      });
  }

  render () {
    return (
      <ContentBlock>
        <Typography align="right">
          <CreateReportButton
            organization={this.props.organization}
          />
        </Typography>
        <ReportsList items={this.state.reports} />
      </ContentBlock>
    );
  }
}

Reports.propTypes = {
  organization: PropTypes.object.isRequired
};
