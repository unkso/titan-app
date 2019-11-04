import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../layouts/dashboard/components/PageHeader/PageHeader';
import PageHeaderTitle from '../../layouts/dashboard/components/PageHeader/PageHeaderTitle';
import { Tab, Tabs } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { TabPanel } from 'titan/components/tabs/TabPanel';
import { Overview } from 'titan/modules/organizations/organizationDetail/Overview';
import { Reports } from 'titan/modules/organizations/organizationDetail/Reports';
import { Members } from 'titan/modules/organizations/organizationDetail/Members';
import * as orgActions from 'titan/actions/organizationActions';
import {
  GetOrganizationBySlugRequest,
  ListOrganizationChainOfCommandRequest,
  makeTitanApiRequest
} from 'titan/http/ApiClient';

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
  }, [slug]);

  if (!organization || !chainOfCommand) {
    return null;
  }

  const headerTabs = [
    <Tab key={0} label="Overview" />,
    <Tab key={1} label="Members" />
  ];
  if (isMemberOfCoc) {
    headerTabs.push(<Tab key={2} label="Reports" />);
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
      <TabPanel value={tabIndex} index={0}>
        <Overview
          orgId={organization.id}
          orgCoc={chainOfCommand}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Members
          organizationId={organization.id}
          orgCoc={chainOfCommand}
          canAddMembers={isMemberOfCoc}
          canRemoveMembers={isMemberOfCoc}
        />
      </TabPanel>
      {isMemberOfCoc &&
      <TabPanel value={tabIndex} index={2}>
        <Reports
          canCreateReport={hasLocalCocRole}
          organization={organization}
        />
      </TabPanel>
      }
    </React.Fragment>
  );
}
