import React from 'react';
import {useSelector} from "react-redux";
import {
    userProfileEventExcusesSelector,
    userProfileFileEntriesSelector,
    userProfileUserSelector
} from "@titan/store/profile";
import {FileEntryExpansionPanelList} from "@titan/components/list/file_entry_expansion_panel_list";
import {AppState} from "@titan/store/root_reducer";
import {
    UserEventExcuseWithAssoc,
    UserFileEntryWithAssoc,
    UserProfile
} from "@titan/http/api";
import {IconButton, Typography} from "@material-ui/core";
import {DashboardSection} from "@titan/layouts/dashboard/dashboard_section";
import {RouteLink} from "@titan/components/routes";
import {ExcuseExpansionPanelList} from "@titan/components/list/excuse_expansion_panel_list";

export function ProfileExcusesScene() {
    const user = useSelector<AppState, UserProfile>(userProfileUserSelector);
    const excuses = useSelector<AppState, UserEventExcuseWithAssoc[]>(userProfileEventExcusesSelector);

    return (
        <DashboardSection>
            <h2>
                <RouteLink to={`/dashboard/members/${user.id}`}>
                    <IconButton>
                        <i className="far fa-arrow-left" />
                    </IconButton>
                </RouteLink>
                <span>Event excuses for <Typography variant="h2" component="span" color="textSecondary">{user.username}</Typography></span>
            </h2>
            <ExcuseExpansionPanelList excuses={excuses} />
        </DashboardSection>
    );
}
