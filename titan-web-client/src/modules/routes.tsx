import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import {DashboardLayout} from "@titan/layouts/dashboard";
import {
    ORGANIZATIONS_DETAIL_ROUTE,
    ORGANIZATIONS_LIST_ROUTE
} from "@titan/modules/organizations/routes";
import OrganizationsListScene from '@titan/modules/organizations/organization_list_scene';
import ManageUnacknowledgedReportsScene from '@titan/modules/organizations/manage_unacknowledged_reports';
import {OrganizationDetailScene} from "@titan/modules/organizations/organization_detail_scene";
import EmptyDarkLayout from "@titan/layouts/empty";
import {LoginScene} from "@titan/modules/auth/login";
import {ListAllUsersScene} from "@titan/modules/roster/ListAllUsersScene";
import ProfileScene from '@titan/modules/roster/profile';
import { ExcusesScene } from '@titan/modules/roster/manage_excuses';
import {
    USER_EXCUSES_ROUTE,
    USER_PROFILE_ROUTE
} from "@titan/modules/roster/routes";

export const routes =(
    <Switch>
        <Route exact path="/">
            <Redirect to={ORGANIZATIONS_LIST_ROUTE} />
        </Route>

        <Route path="/auth">
            <EmptyDarkLayout>
                <Route exact path="/auth/login" component={LoginScene} />
                <Route exact path="/auth/logout" component={LoginScene} />
            </EmptyDarkLayout>
        </Route>

        <Route path="/dashboard">
            <DashboardLayout>
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
            </DashboardLayout>
        </Route>
    </Switch>
);
