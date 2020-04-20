import React, {useEffect} from 'react';
import {CircularProgress, Drawer} from "@material-ui/core";
import {OrganizationsSidebar} from "@titan/layouts/dashboard/organizations_sidebar";
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


export function DashboardLayout(props) {
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

    return (
        <div>
            {userProfile ? (
                <div>
                    <Drawer variant="permanent">
                        <OrganizationsSidebar items={organizations.map(org => ({
                            name: org.organization.name,
                            path: `/dashboard/organizations/${org.organization.id}`,
                        }))} />
                    </Drawer>
                    <main>
                        <section>

                        </section>
                        {props.children}
                    </main>
                </div>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
}
