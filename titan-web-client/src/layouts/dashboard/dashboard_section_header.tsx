import React, {
    PropsWithChildren,
    ReactNode,
    ReactNodeArray
} from 'react';
import styled from 'styled-components';
import {Typography} from "@material-ui/core";

interface DashboardSectionHeaderProps {
    /** Buttons that perform some action. */
    actions?: ReactNode|ReactNodeArray;
    /** Links to other pages. */
    links?: ReactNode|ReactNodeArray;
}

const StyledHeaderContentGroup = styled.div`
  align-items: center;
  display: flex;
  
  > * {
    margin-right: 8px;
  }
`;

const StyledDashboardSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`;

export function DashboardSectionHeader(props: PropsWithChildren<DashboardSectionHeaderProps>) {
    return (
        <StyledDashboardSectionHeader>
            <StyledHeaderContentGroup>
                <Typography component="div" variant="h3">{props.children}</Typography>
                {props.actions}
            </StyledHeaderContentGroup>
            <StyledHeaderContentGroup>{props.links}</StyledHeaderContentGroup>
        </StyledDashboardSectionHeader>
    );
}
