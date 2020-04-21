import React from 'react';
import {Card, CardContent} from '@material-ui/core';
import styled from 'styled-components';
import {Organization} from "@titan/http/api";

interface OrganizationCardProps {
    organization: Organization;
}

export const StyledOrganizationCard = styled(Card)`
  align-items: flex-end;
  background-image: url(${props => props.image});
  background-size: cover;
  display: flex;
  height: 200px;
  width: 350px;
`;

export function OrganizationCard(props: OrganizationCardProps) {
    return (
        <StyledOrganizationCard image={props.organization.previewImageUrl}>
            <CardContent>
                <h3>{props.organization.name}</h3>
            </CardContent>
        </StyledOrganizationCard>
    );
}
