import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
    ChainOfCommand,
    Organization,
    TitanApiClient
} from "@titan/http/api";
import {DashboardSection} from "@titan/layouts/dashboard/dashboard_section";
import {useDispatch, useSelector} from "react-redux";
import {
    OrganizationActions,
    organizationChainOfCommandSelector,
    organizationChildrenSelector,
    organizationModelSelector
} from "@titan/store/organization";
import {combineLatest} from "rxjs";
import {HorizontalScrollViewport} from "@titan/components/scroll/horizontal_scroll_viewport";
import {AppState} from "@titan/store/root_reducer";
import {OrganizationCard} from "@titan/components/organizations/organization_card";
import {useTheme} from "@material-ui/core";

const StyledOrganizationHeader = styled.div`
  align-items: flex-end;
  background: linear-gradient(to bottom, ${props => props.blendColor} 0%, transparent 15%, transparent 50%, ${props => props.blendColor} 100%), url(${props => props.image}) no-repeat center;
  background-size: cover;
  display: flex;
  height: 80vh;
  margin-top: -85px;
  
  h1 {
    font-size: 3.5rem;
    position: relative;
    top: -48px;
  }
`;

const StyledViewportWrapper = styled.div`
  margin-top: -72px;
`;

export function OrganizationScene() {
    const params = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const chainOfCommand = useSelector<AppState, ChainOfCommand[]>(organizationChainOfCommandSelector);
    const children = useSelector<AppState, Organization[]>(organizationChildrenSelector);
    const organization = useSelector<AppState, Organization>(organizationModelSelector);

    useEffect(() => {
        combineLatest([
            TitanApiClient.getOrganization({id: params.id}),
            TitanApiClient.getOrganizationChainOfCommand({orgId: params.id}),
            TitanApiClient.getOrganizationChildren({orgId: params.id}),
            TitanApiClient.getOrganizationsIdUsers({orgId: params.id})
        ]).subscribe(([org, coc, children, users]) => {
            dispatch(OrganizationActions.setOrganization(org));
            // dispatch(OrganizationActions.setChainOfCommand(coc));
            dispatch(OrganizationActions.setChildren(children));
            dispatch(OrganizationActions.setMembers(users));
        });

        return () => {
            dispatch(OrganizationActions.setOrganization(undefined));
            // dispatch(OrganizationActions.setChainOfCommand(coc));
            dispatch(OrganizationActions.setChildren([]));
            dispatch(OrganizationActions.setMembers([]));
        }
    }, [params]);

    if (!organization) {
        return null;
    }

    return (
        <React.Fragment>
            <StyledOrganizationHeader
                image={organization.bannerImageUrl}
                blendColor={theme.palette.background.default}>
                <DashboardSection>
                    <h1>{organization.name}</h1>
                </DashboardSection>
            </StyledOrganizationHeader>
            {children.length > 0 && (
                <StyledViewportWrapper>
                    <HorizontalScrollViewport transparent>
                        {children.map(child => (
                            <OrganizationCard
                                organization={child}
                                key={child.id}
                                size="sm"
                            />
                        ))}
                    </HorizontalScrollViewport>
                </StyledViewportWrapper>
            )}
        </React.Fragment>
    );
}
