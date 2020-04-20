import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import {DashboardLayout} from "@titan/layouts/dashboard";
import {LoginScene} from "@titan/scenes/login/login_scene";

export const routes =(
    <Switch>
        <Route exact path="/">
            <Redirect to="/dashboard" />
        </Route>

        <Route path="/login">
            <LoginScene />
        </Route>

        <Route path="/dashboard">
            <DashboardLayout>
                <p>dashboard page</p>
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
