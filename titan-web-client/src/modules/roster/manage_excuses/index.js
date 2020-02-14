import React from 'react';
import { EventExcuseList }
  from '@titan/modules/roster/components/excuse/event_excuse_list';
import UsersService from '@titan/http/UsersService';
import { ContentBlock } from '@titan/components/block/content_block';
import PageHeader
  from '@titan/layouts/dashboard/components/page_header/page_header';
import PageHeaderTitle from '@titan/layouts/dashboard/components/page_header/page_header_title';
import { IconEmptyState } from '@titan/components/empty_state/icon_empty_state';

export class ExcusesScene extends React.Component {
  constructor (props) {
    super(props);

    this.usersService = new UsersService();
    this.state = {
      excuses: [],
      loading: true
    };
  }

  componentDidMount () {
    this.usersService.listUnacknowledgedExcuses()
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
          <PageHeaderTitle title="Latest Event Excuses" />
        </PageHeader>
        <ContentBlock>
          {this.state.excuses.length > 0 ? (
            <EventExcuseList items={this.state.excuses} />
          ) : (
            <IconEmptyState
              icon="clipboard-list"
              primaryText="All caught up!"
              secondaryText="There are no new event excuses to review"
              verticalMargin={64}
            />
          )}
        </ContentBlock>
      </React.Fragment>
    );
  }
}
