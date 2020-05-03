import React, {PropsWithChildren} from 'react';
import styled from 'styled-components'
import {useTheme} from "@material-ui/core";

export const StyledDashboardSection = styled.div`
  padding: 0 ${props => props.spacing}px;
  width: 100%;
`;

export function DashboardSection(props: PropsWithChildren<{}>) {
    const theme = useTheme();
    return (
        <StyledDashboardSection spacing={theme.spacing(4)}>
            {props.children}
        </StyledDashboardSection>
    );
}
