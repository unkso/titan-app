import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../layouts/dashboard_old/components/page_header/page_header';
import PageHeaderTitle from '../../layouts/dashboard_old/components/page_header/page_header_title';
import { Tab, Tabs } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { TabPanel } from '@titan/components/tabs/tab_panel';
import { Overview } from '@titan/modules/organizations/detail/overview';
import { Reports } from '@titan/modules/organizations/detail/reports';
import { Members } from '@titan/modules/organizations/detail/members';
import * as orgActions from '@titan/actions/organization_actions';
import {
  GetOrganizationBySlugRequest,
  ListOrganizationChainOfCommandRequest,
  makeTitanApiRequest
} from '@titan/http/api_client';
import { Roles } from '@titan/modules/organizations/detail/roles';

const TABS_INDEXES = {
  overview: 0,
  members: 1,
  reports: 2,
  roles: 3
};

export function OrganizationDetailScene () {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const chainOfCommand = useSelector(
    state => state.organization.chainOfCommand);
  const organization = useSelector(state => state.organization.details);
  const [hasLocalCocRole, setHasLocalCocRole] = useState(false);
  const [isMemberOfCoc, setIsMemberOfCoc] = useState(false);
  const authSessionUserId = useSelector(state =>
    state.auth.session.user.id);

  useEffect(() => {
    dispatch(orgActions.clear());
    makeTitanApiRequest(GetOrganizationBySlugRequest, { slug })
      .then(res => {
        dispatch(orgActions.setDetails(res.data));
        return makeTitanApiRequest(ListOrganizationChainOfCommandRequest,
          { id: res.data.id });
      })
      .then(res => {
        const coc = res.data.local_coc.concat(res.data.extended_coc);

        dispatch(orgActions.setChainOfCommand(res.data));
        setHasLocalCocRole(!!res.data.local_coc.find(
          role => role.user_profile.id === authSessionUserId));
        setIsMemberOfCoc(!!coc.find(role =>
          role.user_profile.id === authSessionUserId));
      })
      .catch(err => {
        console.error(err);
        window.location = '/organizations';
      });

    return () => {
      dispatch(orgActions.clear());
    };
  }, [slug, authSessionUserId, dispatch]);

  if (!organization || !chainOfCommand) {
    return null;
  }

  const headerTabs = [
    <Tab key={TABS_INDEXES.overview} label="Overview" />,
    <Tab key={TABS_INDEXES.members} label="Members" />
  ];
  if (isMemberOfCoc) {
    headerTabs.push(<Tab key={TABS_INDEXES.reports} label="Reports" />);

    if (!hasLocalCocRole) {
      headerTabs.push(<Tab key={TABS_INDEXES.roles} label="Settings" />);
    }
  }

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title={organization.name} />
        <Tabs
          onChange={(e, index) => setTabIndex(index)}
          value={tabIndex}>
          {headerTabs}
        </Tabs>
      </PageHeader>
      <TabPanel value={tabIndex} index={TABS_INDEXES.overview}>
        <Overview
          orgId={organization.id}
          orgCoc={chainOfCommand}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={TABS_INDEXES.members}>
        <Members
          organizationId={organization.id}
          orgCoc={chainOfCommand}
          canAddMembers={isMemberOfCoc}
          canRemoveMembers={isMemberOfCoc}
        />
      </TabPanel>

      {isMemberOfCoc && (
        <TabPanel value={tabIndex} index={TABS_INDEXES.reports} key={TABS_INDEXES.reports}>
          <Reports
            canCreateReport={hasLocalCocRole}
            organization={organization}
          />
        </TabPanel>
      )}

      {(isMemberOfCoc && !hasLocalCocRole) && (
        <TabPanel value={tabIndex} index={TABS_INDEXES.roles} key={TABS_INDEXES.roles}>
          <Roles orgId={organization.id} />
        </TabPanel>
      )}
    </React.Fragment>
  );
}
