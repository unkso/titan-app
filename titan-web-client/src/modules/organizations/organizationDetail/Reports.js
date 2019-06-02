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

  addReport (report) {
    const reports = [...this.state.reports, report];
    reports.sort((x, y) => {
      return x.term_start_date < y.term_start_date ? 1 : -1;
    });
    this.setState({ reports });
  }

  render () {
    return (
      <ContentBlock>
        <Typography align="right">
          <CreateReportButton
            onReportSaved={report => this.addReport(report)}
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
