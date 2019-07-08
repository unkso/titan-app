import React from 'react';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import PageHeader
  from 'titan/layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle from 'titan/layouts/dashboard/components/PageHeader/PageHeaderTitle';
import OrganizationsService from 'titan/http/OrganizationsService';
import { ReportsList } from 'titan/components/Reports/ReportsList';
import { withSnackbar } from 'notistack';

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
        this.setState({ reports: res.data, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
        this.props.enqueueSnackbar('Unable to load reports', {
          variant: 'error'
        });
      });
  }

  render () {
    if (this.state.loading) {
      return null;
    }

    return (
      <React.Fragment>
        <PageHeader>
          <PageHeaderTitle title="Latest Reports" />
        </PageHeader>
        <ContentBlock>
          <ReportsList items={this.state.reports} />
        </ContentBlock>
      </React.Fragment>
    );
  }
}

export default withSnackbar(ManageUnacknowledgedReportsScene);
