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
import {ProfileFileEntriesScene} from "@titan/scenes/profile_file_entries_scene";
import {ProfileExcusesScene} from "@titan/scenes/profile_excuses_scene";

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
                <Route exact path="/dashboard/members/:id/file-entries">
                    <ProfileFileEntriesScene />
                </Route>
                <Route exact path="/dashboard/members/:id/event-excuses">
                    <ProfileExcusesScene />
                </Route>
            </DashboardLayout>
        </Route>
    </Switch>
);
