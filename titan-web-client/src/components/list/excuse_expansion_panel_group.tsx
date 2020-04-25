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
  background-color: ${props => props.background};
  
  .panel-icon {
    color: ${props => props.color};
  }
  
  .panel-title {
    margin-left: 16px;
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
                return (
                    <ExpansionPanel
                        key={excuse.id}
                        expanded={expandedPanel === excuse.id}
                        onChange={() => expandPanel(excuse.id)}>
                        <ExpansionPanelSummary expandIcon={<i className="far fa-angle-down" />}>
                            <StyledSummary>
                                <i className={`fas fa-info panel-icon`} />
                                <span className="panel-title">{excuse.eventType.name}</span>
                            </StyledSummary>
                        </ExpansionPanelSummary>
                        <StyledExpansionPanelDetails background={Palette.background[300]}>
                            <div>
                                <p>{excuse.comments}</p>
                                <Typography color="textSecondary" variant="caption">
                                    Created on {dateCreated}. Acknowledged by <Link href={`/dashboard/members/${excuse.ackUserId}`}>{excuse.ackUserId}</Link>
                                </Typography>
                            </div>
                        </StyledExpansionPanelDetails>
                    </ExpansionPanel>
                );
            })}
        </div>
    );
}
