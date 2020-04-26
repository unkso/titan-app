import React, {useState} from 'react';
import styled from 'styled-components';
import {UserFileEntryWithAssoc} from "@titan/http/api";
import {
    ExpansionPanel, ExpansionPanelDetails,
    ExpansionPanelSummary, Link, Typography, useTheme
} from "@material-ui/core";
import {getFileEntryTheme} from "@titan/components/file_entry";
import {
    FILE_ENTRY_A15,
    FILE_ENTRY_BCT_E0_COMPLETE
} from "@titan/components/file_entry/constants";
import {Palette} from "@titan/themes/default";
import {format as formatDate} from "date-fns";

interface FileEntryExpansionPanelGroupProps {
    fileEntries: UserFileEntryWithAssoc[];
}

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  background-color: ${props => props.background};
`;

const StyledSummary = styled.div`
  background-color: ${props => props.background};
  
  .panel-icon {
    color: ${props => props.color};
  }
  
  .panel-title {
    margin-left: 16px;
  }
`;

export function FileEntryExpansionPanelGroup(props: FileEntryExpansionPanelGroupProps) {
    const [expandedPanel, setExpandedPanel] = useState();
    const theme = useTheme();
    const expandPanel = panelId => {
        if (expandedPanel === panelId) {
            setExpandedPanel(undefined);
        } else {
            setExpandedPanel(panelId);
        }
    };

    // FIXME DO NOT SUBMIT Remove this test code.
    const fileEntry = props.fileEntries[0];
    const fileEntries = [
        fileEntry,
        {...fileEntry, id: 2, fileEntryType: {name: FILE_ENTRY_A15}},
        {...fileEntry, id: 3, fileEntryType: {name: FILE_ENTRY_BCT_E0_COMPLETE}},
        {...fileEntry, id: 4},
        {...fileEntry, id: 5},
    ];

    return (
        <div>
            {fileEntries.map(fileEntry => {
                const dateModified = formatDate(new Date(fileEntry.dateModified), 'MMMM dd, yyyy');
                const fileEntryTheme = getFileEntryTheme(fileEntry.fileEntryType.name, theme);
                return (
                    <ExpansionPanel
                        key={fileEntry.id}
                        expanded={expandedPanel === fileEntry.id}
                        onChange={() => expandPanel(fileEntry.id)}>
                        <ExpansionPanelSummary expandIcon={<i className="far fa-angle-down" />}>
                            <StyledSummary color={fileEntryTheme.color}>
                                <i className={`fas fa-${fileEntryTheme.icon} panel-icon`} />
                                <span className="panel-title">{fileEntry.fileEntryType.name}</span>
                            </StyledSummary>
                        </ExpansionPanelSummary>
                        <StyledExpansionPanelDetails background={Palette.background[300]}>
                            <div>
                                <p>{fileEntry.comments}</p>
                                <Typography color="textSecondary" variant="caption">
                                    Created on {dateModified} by <Link href={`/dashboard/members/${fileEntry.modifiedBy.id}`}>{fileEntry.modifiedBy.username}</Link>.
                                </Typography>
                            </div>
                        </StyledExpansionPanelDetails>
                    </ExpansionPanel>
                );
            })}
        </div>
    );
}
