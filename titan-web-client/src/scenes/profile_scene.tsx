import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
    Avatar, Button,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    TitanApiClient, UserEventExcuseWithAssoc,
    UserFileEntryWithAssoc, UserOrganizationMembership,
    UserProfile
} from "@titan/http/api";
import {combineLatest} from "rxjs";
import {
    UserProfileActions,
    userProfileEventExcusesSelector,
    userProfileFileEntriesSelector,
    userProfileOrganizationMembershipsSelector,
    userProfileUserSelector
} from "@titan/store/profile";
import {AppState} from "@titan/store/root_reducer";
import {ActivityIndicator} from "@titan/components/activity/activity_indicator";
import {HorizontalScrollViewport} from "@titan/components/scroll/horizontal_scroll_viewport";
import {OrganizationCard} from "@titan/components/organizations/organization_card";
import {DashboardSection} from "@titan/layouts/dashboard/dashboard_section";
import {FileEntryExpansionPanelGroup} from "@titan/components/list/file_entry_expansion_panel_group";
import {RouteButton} from "@titan/components/routes";
import {ExcuseExpansionPanelGroup} from "@titan/components/list/excuse_expansion_panel_group";
import {DashboardSectionHeader} from "@titan/layouts/dashboard/dashboard_section_header";
import {CreateEventExcuseContainer} from "@titan/scenes/containers/create_event_excuse_container";
import {CreateFileEntryContainer} from "@titan/scenes/containers/create_file_entry_container";

const StyledAvatar = styled(Avatar)`
    height: 56px;
    margin-right: 8px;
    width: 56px;
`;

const StyledHeadline = styled.div`
  align-items: center;
  display: flex;
  
  .user-activity {
    margin-top: -8px;
  }
`;

export function ProfileScene() {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector<AppState, UserProfile>(userProfileUserSelector);
    const allEventExcuses = useSelector<AppState, UserEventExcuseWithAssoc[]>(userProfileEventExcusesSelector);
    const allFileEntries = useSelector<AppState, UserFileEntryWithAssoc[]>(userProfileFileEntriesSelector);
    const [latestEventExcuses, setLatestEventExcuses] = useState<UserEventExcuseWithAssoc[]>([]);
    const [latestFileEntries, setLatestFileEntries] = useState<UserFileEntryWithAssoc[]>([]);
    const memberships = useSelector<AppState, UserOrganizationMembership[]>(userProfileOrganizationMembershipsSelector);

    useEffect(() => {
        combineLatest([
            TitanApiClient.getUser({userId: params.id}),
            TitanApiClient.getUserFileEntries({userId: params.id}),
            TitanApiClient.getUserExcuses({userId: params.id}),
            TitanApiClient.getUserOrganizations({userId: params.id, member: true, role: true})
        ]).subscribe(([user, fileEntries, excuses, memberships]) => {
            dispatch(UserProfileActions.setUser(user));
            dispatch(UserProfileActions.setEventExcuses(excuses));
            dispatch(UserProfileActions.setFileEntries(fileEntries));
            dispatch(UserProfileActions.setOrganizationMemberships(memberships));
        });
    }, [params]);

    useEffect(() => {
        setLatestEventExcuses(allEventExcuses.slice(0, 5));
    }, [allEventExcuses]);

    useEffect(() => {
        setLatestFileEntries(allFileEntries.slice(0, 5));
    }, [allFileEntries]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <DashboardSection>
                <StyledHeadline>
                    <StyledAvatar
                        src={"https://clanunknownsoldiers.com/wcf/images/avatars/94/1238-949157b51dc4b03f8c95767eab5dcfc4cabd35ee.png"} />
                    <div>
                        <Typography variant="h1">{user.username}</Typography>
                        <div className="user-activity">
                            <ActivityIndicator timestamp={user.wcf.lastActivityTime} />
                        </div>
                    </div>
                </StyledHeadline>
            </DashboardSection>

            {memberships.length > 0 && (
                <HorizontalScrollViewport>
                    {memberships.map(membership => (
                        <OrganizationCard
                            key={membership.organization.id}
                            organization={membership.organization}
                            size="sm"
                        />
                    ))}
                </HorizontalScrollViewport>
            )}

            {latestFileEntries.length > 0 && (
                <DashboardSection>
                    <DashboardSectionHeader
                        actions={[
                            <CreateFileEntryContainer key="add-entry" />
                        ]}
                        links={[
                            <RouteButton
                                key="view-entries"
                                to={`/dashboard/members/${user.id}/file-entries`}>View all</RouteButton>
                        ]}>Latest activity</DashboardSectionHeader>
                    <FileEntryExpansionPanelGroup fileEntries={latestFileEntries} />
                </DashboardSection>
            )}

            {latestEventExcuses.length > 0 && (
                <DashboardSection>
                    <DashboardSectionHeader
                        actions={[
                            <CreateEventExcuseContainer key="add-excuse" />,
                        ]}
                        links={[
                            <RouteButton
                                key="view-excuses"
                                to={`/dashboard/members/${user.id}/event-excuses`}>View all</RouteButton>
                        ]}>Latest event excuses</DashboardSectionHeader>
                    <ExcuseExpansionPanelGroup excuses={latestEventExcuses} />
                </DashboardSection>
            )}
        </div>
    );
}
