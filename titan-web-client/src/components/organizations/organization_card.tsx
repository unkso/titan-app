import React from 'react';
import {Card} from '@material-ui/core';
import styled from 'styled-components';
import {Organization} from "@titan/http/api";

interface OrganizationCardProps {
    organization: Organization;
}

const StyledOrganizationCard = styled(Card)`
  align-items: flex-end;
  display: flex;
  height: 200px;
  width: 350px;
`;

const StyledCardHeader = styled.div`

`;

export function OrganizationCard(props: OrganizationCardProps) {
    return (
        <StyledOrganizationCard>
            <img src="#" alt={props.organization.name} />
            <StyledCardHeader>
                <h3>{props.organization.name}</h3>
            </StyledCardHeader>
        </StyledOrganizationCard>
    );
}
