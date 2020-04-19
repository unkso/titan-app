import React, {useEffect} from 'react';
import {Drawer} from "@material-ui/core";
import {OrganizationsSidebar} from "@titan/layouts/dashboard/organizations_sidebar";
import {
    TitanApiClient,
} from "@titan/http/api";
import {useSelector} from "react-redux";
import {
    authOrganizationsSelector,
    AuthUserActions,
    authUserSelector
} from "@titan/store/auth_user";
import {combineLatest} from "rxjs";


export function DashboardLayout(props) {
    const user = useSelector(authUserSelector);
    const organizations = useSelector(authOrganizationsSelector);

    useEffect(() => {
        combineLatest([
            // Fetch authenticated user's profile.
            TitanApiClient.getUser({userId: user.id}),
            // Fetch organizations where the authenticated user is a
            // leader or a member.
            TitanApiClient.getUserOrganizations({
                userId: user.id,
                member: true,
                role: true
            })
        ]).subscribe(([user, orgs]) => {
            AuthUserActions.setProfile(user);
            AuthUserActions.setOrganizations(orgs);
        });
    }, [user]);
    return (
        <div>
            <Drawer variant="permanent">
                <OrganizationsSidebar organizations={organizations}></OrganizationsSidebar>
            </Drawer>
            <main>
                <section>

                </section>
                {props.children}
            </main>
        </div>
    );
}
