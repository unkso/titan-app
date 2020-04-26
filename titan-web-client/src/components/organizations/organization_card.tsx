import React, {useEffect, useState} from 'react';
import {Card, CardContent} from '@material-ui/core';
import styled from 'styled-components';
import {Organization} from "@titan/http/api";

interface OrganizationCardProps {
    organization: Organization;
    size?: 'sm'|'md'|'lg';
}

const OrganizationCardSizeMap = new Map([
    ['sm', {height: 175, width: 297}],
    ['md', {height: 250, width: 425}],
]);

export const StyledOrganizationCard = styled(Card)`
  align-items: flex-end;
  background-image: url(${props => props.image});
  background-size: cover;
  display: flex;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`;

export function OrganizationCard(props: OrganizationCardProps) {
    const [dimensions, setDimensions] = useState();

    useEffect(() => {
        setDimensions(OrganizationCardSizeMap.get(props.size || 'md'));
    }, [props.size]);

    if (!dimensions) {
        return null;
    }

    return (
        <StyledOrganizationCard
            image={props.organization.previewImageUrl}
            height={dimensions.height}
            width={dimensions.width}>
            <CardContent>
                <h3>{props.organization.name}</h3>
            </CardContent>
        </StyledOrganizationCard>
    );
}
