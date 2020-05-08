import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Theme, Tooltip, useTheme} from "@material-ui/core";

interface ActivityIndicatorProps {
    timestamp: number;
    variant?: 'label'|'indicator'|'both';
}

enum ActivityStatus {
    ACTIVE_WITHIN_TWO_DAYS,
    ACTIVE_WITHIN_ONE_WEEK,
    INACTIVE,
}

const ActivityStatusLabelMap = new Map([
    [ActivityStatus.ACTIVE_WITHIN_TWO_DAYS, 'Active'],
    [ActivityStatus.ACTIVE_WITHIN_ONE_WEEK, 'Less active'],
    [ActivityStatus.INACTIVE, 'Inactive'],
]);

const ActivityTooltipMap = new Map([
    [ActivityStatus.ACTIVE_WITHIN_TWO_DAYS, 'Active within 48 hours'],
    [ActivityStatus.ACTIVE_WITHIN_ONE_WEEK, 'Active 1 week'],
    [ActivityStatus.INACTIVE, 'Inactive for over 1 week'],
]);

// Two days in seconds.
const TWO_DAYS_SEC = 86400;

// One week in seconds.
const ONE_WEEK_SEC = 604800;

export const StyledActivityIndicatorDot = styled.div`
  border-radius: 50%;
  height: .8em;
  margin-right: 8px;
  width: .8em;
`;

export const StyledActivityIndicator = styled.div`
  align-items: center;
  color: ${props => props.color};
  display: inline-flex;

  ${StyledActivityIndicatorDot} {
    background-color: ${props => props.color};
  }
`;

function getStatusFromTimestamp(timestamp: number): ActivityStatus {
    const nowInSeconds = (new Date()).getTime();
    const diff = nowInSeconds - timestamp;

    if (diff < TWO_DAYS_SEC) {
        return ActivityStatus.ACTIVE_WITHIN_TWO_DAYS;
    } else if (diff < ONE_WEEK_SEC) {
        return ActivityStatus.ACTIVE_WITHIN_ONE_WEEK;
    }

    return ActivityStatus.INACTIVE;
}

function getStatusColor(status: ActivityStatus, theme: Theme): string {
    switch (status) {
        case ActivityStatus.ACTIVE_WITHIN_TWO_DAYS:
            return theme.palette.success.main;
        case ActivityStatus.ACTIVE_WITHIN_ONE_WEEK:
            return theme.palette.warning.main;
        default:
            return theme.palette.error.main;
    }
}

export function ActivityIndicator(props: ActivityIndicatorProps) {
    const theme = useTheme();
    const [label, setLabel] = useState();
    const [tooltip, setTooltip] = useState('');
    const [color, setColor] = useState();

    useEffect(() => {
        const status = getStatusFromTimestamp(props.timestamp);
        setTooltip(ActivityTooltipMap.get(status)!);
        switch (props.variant) {
            case 'label':
                setColor('');
                setLabel(ActivityStatusLabelMap.get(status));
                return;
            case 'indicator':
                setColor(getStatusColor(status, theme));
                setLabel('');
                return;
            default:
                setColor(getStatusColor(status, theme));
                setLabel(ActivityStatusLabelMap.get(status));
        }
    }, [props.timestamp, props.variant, theme]);

    return (
        <Tooltip title={tooltip} arrow>
            <StyledActivityIndicator color={color}>
                <StyledActivityIndicatorDot />
                <span>{label}</span>
            </StyledActivityIndicator>
        </Tooltip>
    );
}
