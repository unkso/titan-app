import React, {useEffect, useState} from 'react';
import {CircularProgress, Drawer, useTheme} from "@material-ui/core";
import styled from 'styled-components';
import {ContextSidebar} from "@titan/layouts/dashboard/context_sidebar";
import {TitanApiClient} from "@titan/http/api";
import {useDispatch, useSelector} from "react-redux";
import {
    authCredentialsSelector,
    authOrganizationsSelector,
    AuthUserActions,
    AuthUserCredentials,
    authUserSelector
} from "@titan/store/auth_user";
import {combineLatest} from "rxjs";
import {AppState} from "@titan/store/root_reducer";
import {PageToolbar} from "@titan/layouts/dashboard/page_toolbar";
import {PageSidebar} from "@titan/layouts/dashboard/page_sidebar";
import {
    DashboardLayoutPageMenu,
    dashboardLayoutPageMenuSelector,
    DashboardLayoutPageMenuState,
    dashboardLayoutPageMenuStateSelector
} from "@titan/store/dashboard_layout";

const StyledDrawer = styled(Drawer)`
  .context-sidebar-paper {
    border-right: none;
    flex-direction: row;
  }
`;

const StyledContentSection = styled.div`
  margin-left: ${props => props.offset};
  padding: 0 ${props => props.padding}px ${props => props.padding}px;
`;

const StyledCircularProgress = styled(CircularProgress)`
  left: calc(50% - 20px);
  position: absolute;
  top: calc(50% - 20px);
`;

const MENU_COLLAPSED_OFFSET = '70px';
const MENU_EXPANDED_OFFSET = '310px';

export function DashboardLayout(props) {
    const theme = useTheme();
    const userProfile = useSelector(authUserSelector);
    const organizations = useSelector(authOrganizationsSelector);
    const credentials = useSelector<AppState, AuthUserCredentials>(authCredentialsSelector);
    const pageMenu = useSelector<AppState, DashboardLayoutPageMenu|undefined>(dashboardLayoutPageMenuSelector);
    const pageMenuState = useSelector<AppState, DashboardLayoutPageMenuState>(dashboardLayoutPageMenuStateSelector);
    const [contentOffset, setContentOffset] = useState(MENU_EXPANDED_OFFSET);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!credentials) {
            window.location.href = '/login';
            return;
        }

        combineLatest([
            TitanApiClient.getAuthenticatedUser(),
            TitanApiClient.getUserAcl({userId: credentials.userId}),
            TitanApiClient.getUserOrganizations({
                userId: credentials.userId,
                member: true,
                role: true,
            })
        ]).subscribe(([userProfile, acl, orgs]) => {
            dispatch(AuthUserActions.setUser(userProfile));
            dispatch(AuthUserActions.setAclOptions(
                acl.map(option =>
                    `mod.${option.categoryName}.${option.optionName}`
                )));
            dispatch(AuthUserActions.setOrganizations(orgs));
        });
    }, [credentials, dispatch]);

    useEffect(() => {
        setContentOffset((pageMenuState === DashboardLayoutPageMenuState.EXPANDED && !!pageMenu)
            ? MENU_EXPANDED_OFFSET
            : MENU_COLLAPSED_OFFSET);
    }, [pageMenuState, pageMenu]);

    if (!userProfile) {
        return <StyledCircularProgress />;
    }

    return (
        <div>
            <StyledDrawer
                classes={{
                    paper: 'context-sidebar-paper',
                }}
                variant="permanent"
                >
                <ContextSidebar items={organizations.map(org => ({
                    imageUrl: org.organization.avatarUrl,
                    name: org.organization.name,
                    path: `/dashboard/community/organizations/${org.organization.id}`,
                }))}
                />
                {pageMenu && (
                    <PageSidebar menu={pageMenu} />
                )}
            </StyledDrawer>
            <StyledContentSection
                offset={contentOffset}
                padding={theme.spacing(4)}>
                <PageToolbar userProfile={userProfile} />
                <section>{props.children}</section>
            </StyledContentSection>
        </div>
    );
}
