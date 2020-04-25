import React, {useState} from 'react';
import styled from 'styled-components';
import {UserEventExcuseWithAssoc} from "@titan/http/api";
import {
    ExpansionPanel, ExpansionPanelDetails,
    ExpansionPanelSummary, Link, Typography, useTheme
} from "@material-ui/core";
import {Palette} from "@titan/themes/default";
import {format as formatDate} from "date-fns";

interface ExcuseExpansionPanelGroupProps {
    excuses: UserEventExcuseWithAssoc[];
}

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  background-color: ${props => props.background};
`;

const StyledSummary = styled.div`
  .panel-icon {
    color: ${props => props.color};
  }
  
  .panel-title {
    align-items: center;
    display: inline-flex;
    margin-left: 16px;
    
    .spacer {
      font-size: 4px;
      margin: 0 8px;
    }
    
    .event-date {
      position: relative;
      top: 1px;
    }
  }
`;

export function ExcuseExpansionPanelGroup(props: ExcuseExpansionPanelGroupProps) {
    const [expandedPanel, setExpandedPanel] = useState();
    const theme = useTheme();
    const expandPanel = panelId => {
        if (expandedPanel === panelId) {
            setExpandedPanel(undefined);
        } else {
            setExpandedPanel(panelId);
        }
    };

    return (
        <div>
            {props.excuses.map(excuse => {
                const dateCreated = formatDate(new Date(excuse.dateCreated), 'MMMM dd, yyyy');
                const eventDate = formatDate(new Date(excuse.eventDate), 'MMM dd');
                return (
                    <ExpansionPanel
                        key={excuse.id}
                        expanded={expandedPanel === excuse.id}
                        onChange={() => expandPanel(excuse.id)}>
                        <ExpansionPanelSummary expandIcon={<i className="far fa-angle-down" />}>
                            <StyledSummary color={theme.palette.info.light}>
                                <i className={`fas fa-clipboard-user panel-icon`} />
                                <span className="panel-title">
                                    <span>{excuse.eventType.name}</span>
                                    <i className="fas fa-circle spacer" />
                                    <Typography
                                        className="event-date"
                                        color="textSecondary"
                                        variant="caption">{eventDate}</Typography>
                                </span>
                            </StyledSummary>
                        </ExpansionPanelSummary>
                        <StyledExpansionPanelDetails background={Palette.background[300]}>
                            <div>
                                <p>{excuse.comments}</p>
                                <Typography color="textSecondary" variant="caption">
                                    <span>Created on {dateCreated}. </span>
                                    {excuse.ackUser && (
                                        <span>Acknowledged by <Link href={`/dashboard/members/${excuse.ackUser.id}`}>{excuse.ackUser.username}</Link>.</span>
                                    )}
                                </Typography>
                            </div>
                        </StyledExpansionPanelDetails>
                    </ExpansionPanel>
                );
            })}
        </div>
    );
}
