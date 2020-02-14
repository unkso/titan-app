import React from 'react';
import { ContentBlock } from '@titan/components/block/content_block';
import PageHeader
  from '@titan/layouts/dashboard/components/page_header/page_header';
import PageHeaderTitle from '@titan/layouts/dashboard/components/page_header/page_header_title';
import OrganizationsService from '@titan/http/OrganizationsService';
import { ReportsList } from '@titan/components/reports/reports_list';
import { withSnackbar } from 'notistack';
import { IconEmptyState } from '@titan/components/empty_state/icon_empty_state';

export class Manage_unacknowledged_reports extends React.Component {
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
          {this.state.reports.length > 0 ? (
            <ReportsList items={this.state.reports} />
          ) : (
            <IconEmptyState
              icon="file-alt"
              primaryText="All caught up!"
              secondaryText="There are no new reports to review"
              verticalMargin={64}
            />
          )}
        </ContentBlock>
      </React.Fragment>
    );
  }
}

export default withSnackbar(Manage_unacknowledged_reports);
