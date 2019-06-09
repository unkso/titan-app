import React from 'react';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import PageHeader
  from 'titan/layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle from 'titan/layouts/dashboard/components/PageHeader/PageHeaderTitle';
import OrganizationsService from 'titan/http/OrganizationsService';
import { ReportsList } from 'titan/components/Reports/ReportsList';

export class ManageUnacknowledgedReportsScene extends React.Component {
  constructor (props) {
    super(props);

    this.organizationsService = new OrganizationsService();
    this.state = {
      reports: [],
      coc_cache: {},
      loading: true
    };
  }

  componentDidMount () {
    this.organizationsService.findUnacknowledgedReports()
      .then((res) => {
        this.setState({ excuses: res.data, loading: false });
      })
      .catch(() => {
        // TODO handle error state.
        this.setState({ loading: false });
      });
  }

  render () {
    if (this.state.loading) {
      return null;
    }

    return (
      <React.Fragment>
        <PageHeader>
          <PageHeaderTitle title="Unacknowledged Excuses" />
        </PageHeader>
        <ContentBlock>
          <ReportsList items={this.state.excuses} />
        </ContentBlock>
      </React.Fragment>
    );
  }
}
