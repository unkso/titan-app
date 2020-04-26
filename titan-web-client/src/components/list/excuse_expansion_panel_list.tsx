import React from "react";
import {UserEventExcuseWithAssoc} from "@titan/http/api";
import {ExpansionPanelGroupList} from "@titan/components/list/expansion_panel_group_list";
import { format as formatDate } from 'date-fns';
import {ExcuseExpansionPanelGroup} from "@titan/components/list/excuse_expansion_panel_group";

interface ExcuseExpansionPanelListProps {
    excuses: UserEventExcuseWithAssoc[];
}

export function ExcuseExpansionPanelList(props: ExcuseExpansionPanelListProps) {
    const convertDateToString = (excuse: UserEventExcuseWithAssoc): string =>
        formatDate(new Date(excuse.eventDate), 'MMMM yyyy');
    const componentFactory = (excuses: UserEventExcuseWithAssoc[]) => {
        const key = excuses.reduce((key, excuse) => `${key}-${excuse.id}`, '');
        return (
            <ExcuseExpansionPanelGroup key={key} excuses={excuses} />
        );
    };

    return (
        <ExpansionPanelGroupList
            componentFactory={componentFactory}
            groupLabelStrategy={convertDateToString}
            models={props.excuses}
        />
    );
}
