import React from 'react';
import styled from 'styled-components';
import {Organization} from "@titan/http/api";
import {
    OrganizationCard,
    StyledOrganizationCard
} from "@titan/components/organizations/organization_card";

interface OrganizationsListProps {
    organizations: ReadonlyArray<Organization>;
}

const StyledOrganizationsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  ${StyledOrganizationCard} {
    margin: 8px;
  }
`;

export function OrganizationsList(props: OrganizationsListProps) {
    return (
        <StyledOrganizationsList>
            {props.organizations.map((org, index) =>
                <OrganizationCard
                    key={index}
                    organization={org}
                />
            )}
        </StyledOrganizationsList>
    );
}
