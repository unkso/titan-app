import React from 'react';
import { EventExcuseList }
  from '@titan/modules/roster/components/Excuse/EventExcuseList';
import UsersService from '@titan/http/UsersService';
import { ContentBlock } from '@titan/components/block/ContentBlock';
import PageHeader
  from '@titan/layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle from '@titan/layouts/dashboard/components/PageHeader/PageHeaderTitle';
import { IconEmptyState } from '@titan/components/EmptyStates/IconEmptyState';

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
