import React from "react";
import {UserFileEntryWithAssoc} from "@titan/http/api";
import {ExpansionPanelGroupList} from "@titan/components/list/expansion_panel_group_list";
import { format as formatDate } from 'date-fns';
import {FileEntryExpansionPanelGroup} from "@titan/components/list/file_entry_expansion_panel_group";

interface FileEntryExpansionPanelListProps {
    fileEntries: UserFileEntryWithAssoc[];
}

export function FileEntryExpansionPanelList(props: FileEntryExpansionPanelListProps) {
    const convertDateToString = (fileEntry: UserFileEntryWithAssoc): string =>
        formatDate(new Date(fileEntry.startDate), 'MMMM yyyy');
    const componentFactory = (fileEntries: UserFileEntryWithAssoc[]) => {
        return (
            <FileEntryExpansionPanelGroup fileEntries={fileEntries} />
        );
    };

    return (
        <ExpansionPanelGroupList
            componentFactory={componentFactory}
            groupLabelStrategy={convertDateToString}
            models={props.fileEntries}
        />
    )
}
