import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import {useTheme} from "@material-ui/core";

interface IconEmptyStateProps {
    horizontalMargin?: number;
    icon: string;
    primaryText: string;
    secondaryText?: string;
    verticalMargin?: number;
}

export const EmptyStateWrapper = styled.div`
  margin: ${props => `${props.verticalMargin}px ${props.horizontalMargin}px`};
  text-align: center;
`;

export function IconEmptyState(props: IconEmptyStateProps) {
    const theme = useTheme();

    return (
        <EmptyStateWrapper
            horizontalMargin={props.horizontalMargin || 8}
            verticalMargin={props.verticalMargin || 8}>
        <span
            className={`fas fa-${props.icon}`}
            style={{
                color: theme.palette.primary.light,
                fontSize: '4em',
                marginBottom: '8px'
            }}
        />
            <h3>{props.primaryText}</h3>
            <Typography variant="body1" color="textSecondary">{props.secondaryText}</Typography>
        </EmptyStateWrapper>
    );
}
