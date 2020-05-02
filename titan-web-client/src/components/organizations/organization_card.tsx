import React, {useEffect, useState} from 'react';
import {Avatar, Card, CardContent} from '@material-ui/core';
import styled from 'styled-components';
import {Organization} from "@titan/http/api";
import {RouteLink} from "@titan/components/routes";
import {Palette} from "@titan/themes/default";

interface OrganizationCardProps {
    organization: Organization;
    size?: 'sm'|'md';
}

const OrganizationCardSizeMap = new Map([
    ['sm', {height: 175, width: 297}],
    ['md', {height: 250, width: 425}],
]);

export const StyledOrganizationCard = styled(Card)`
  align-items: flex-end;
  background: linear-gradient(to bottom, transparent 15%, ${props => props.blendcolor} 100%), url(${props => props.image}) no-repeat center;
  background-size: cover;
  display: flex;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`;

const StyledOrgName = styled.h3`
  display: flex;
  
  .org-name {
    margin-left: 8px;
  }
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
        <RouteLink to={`/dashboard/organizations/${props.organization.id}`}>
            <StyledOrganizationCard
                blendcolor={Palette.background['900']}
                image={props.organization.previewImageUrl}
                height={dimensions.height}
                width={dimensions.width}>
                <CardContent>
                    <StyledOrgName>
                        <Avatar src={props.organization.avatarUrl} />
                        <span className="org-name">{props.organization.name}</span>
                    </StyledOrgName>
                </CardContent>
            </StyledOrganizationCard>
        </RouteLink>
    );
}
