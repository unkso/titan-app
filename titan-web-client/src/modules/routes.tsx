import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import {DashboardLayout} from "@titan/layouts/dashboard";
import {LoginScene} from "@titan/scenes/login/login_scene";
import {DashboardScene} from "@titan/scenes/dashboard/dashboard_scene";
import {OrganizationsListScene} from "@titan/scenes/organizations_list_scene";
import {OrganizationScene} from "@titan/scenes/organization_scene";
import {CommunityScene} from "@titan/scenes/community";
import {MembersScene} from "@titan/scenes/community/members_scene";
import {ProfileScene} from "@titan/scenes/profile_scene";

export const routes =(
    <Switch>
        <Route exact path="/">
            <Redirect to="/login" />
        </Route>

        <Route path="/login">
            <LoginScene />
        </Route>

        <Route path="/dashboard">
            <DashboardLayout>
                <Route exact path="/dashboard">
                    <DashboardScene />
                </Route>
                <Route path="/dashboard/community">
                    <CommunityScene>
                        <Route exact path="/dashboard/community">
                            <Redirect to="/dashboard/community/organizations" />
                        </Route>
                        <Route exact path="/dashboard/community/organizations">
                            <OrganizationsListScene />
                        </Route>
                        <Route exact path="/dashboard/community/members">
                            <MembersScene />
                        </Route>
                    </CommunityScene>
                </Route>
                <Route exact path="/dashboard/community/organizations/:id">
                    <OrganizationScene />
                </Route>
                <Route exact path="/dashboard/members/:id">
                    <ProfileScene />
                </Route>
            </DashboardLayout>
            {/*<DashboardLayoutOld>
                <Route path="/organizations">
                    <Route exact path={ORGANIZATIONS_LIST_ROUTE} component={OrganizationsListScene} />
                    <Route exact path={ORGANIZATIONS_DETAIL_ROUTE} component={OrganizationDetailScene} />
                    <Route exact path="/organizations/reports/unacknowledged" component={ManageUnacknowledgedReportsScene} />
                </Route>
                <Route path="/roster">
                    <Route exact path={USER_EXCUSES_ROUTE} component={ExcusesScene} />
                    <Route exact path={USER_PROFILE_ROUTE} component={ProfileScene} />
                    <Route exact path="/roster" component={ListAllUsersScene} />
                </Route>
            </DashboardLayoutOld>*/}
        </Route>
    </Switch>
);
