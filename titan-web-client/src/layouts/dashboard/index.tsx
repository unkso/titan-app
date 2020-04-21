import React, {useEffect} from 'react';
import {CircularProgress, Drawer, useTheme} from "@material-ui/core";
import styled from 'styled-components';
import {ContextSidebar} from "@titan/layouts/dashboard/context_sidebar";
import {TitanApiClient} from "@titan/http/api";
import {useDispatch, useSelector} from "react-redux";
import {
    authCredentialsSelector,
    authOrganizationsSelector,
    AuthUserActions, AuthUserCredentials,
    authUserSelector
} from "@titan/store/auth_user";
import {combineLatest} from "rxjs";
import {AppState} from "@titan/store/root_reducer";
import {PageToolbar} from "@titan/layouts/dashboard/page_toolbar";

const StyledDrawer = styled(Drawer)`
  .context-sidebar-paper {
    border-right: none;
  }
`;

const StyledContentSection = styled.div`
  margin-left: 70px;
  padding: 0 ${props => props.padding}px;
`;

const StyledCircularProgress = styled(CircularProgress)`
  left: calc(50% - 20px);
  position: absolute;
  top: calc(50% - 20px);
`;

export function DashboardLayout(props) {
    const theme = useTheme();
    const userProfile = useSelector(authUserSelector);
    const organizations = useSelector(authOrganizationsSelector);
    const credentials = useSelector<AppState, AuthUserCredentials>(authCredentialsSelector);
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
    }, [credentials]);

    if (!userProfile) {
        return <StyledCircularProgress />;
    }

    return (
        <div>
            <StyledDrawer variant="permanent" classes={{
                paper: 'context-sidebar-paper',
            }}>
                <ContextSidebar items={organizations.map(org => ({
                    name: org.organization.name,
                    path: `/dashboard/organizations/${org.organization.id}`,
                }))} />
            </StyledDrawer>
            <StyledContentSection padding={theme.spacing(4)}>
                <PageToolbar userProfile={userProfile} />
                <section>{props.children}</section>
            </StyledContentSection>
        </div>
    );
}
