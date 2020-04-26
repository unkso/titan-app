import React from 'react';
import {useSelector} from "react-redux";
import {
    userProfileFileEntriesSelector,
    userProfileUserSelector
} from "@titan/store/profile";
import {FileEntryExpansionPanelList} from "@titan/components/list/file_entry_expansion_panel_list";
import {AppState} from "@titan/store/root_reducer";
import {UserFileEntryWithAssoc, UserProfile} from "@titan/http/api";
import {IconButton, Typography} from "@material-ui/core";
import {DashboardSection} from "@titan/layouts/dashboard/dashboard_section";
import {RouteLink} from "@titan/components/routes";

export function ProfileFileEntriesScene() {
    const user = useSelector<AppState, UserProfile>(userProfileUserSelector);
    const fileEntries = useSelector<AppState, UserFileEntryWithAssoc[]>(userProfileFileEntriesSelector);

    if (!user || !fileEntries) {
        window.location.href = '/dashboard';
        return null;
    }

    return (
        <DashboardSection>
            <h2>
                <RouteLink to={`/dashboard/members/${user.id}`}>
                    <IconButton>
                        <i className="far fa-arrow-left" />
                    </IconButton>
                </RouteLink>
                <span>File entries for <Typography variant="h2" component="span" color="textSecondary">{user.username}</Typography></span>
            </h2>
            <FileEntryExpansionPanelList fileEntries={fileEntries} />
        </DashboardSection>
    );
}
