import React from 'react';
import styled, {keyframes} from 'styled-components';
import {
    Organization, OrganizationRoleWithAssoc,
} from "@titan/http/api";
import {DashboardSection} from "@titan/layouts/dashboard/dashboard_section";
import {useSelector} from "react-redux";
import {
    organizationChainOfCommandSelector,
    organizationChildrenSelector, organizationMembersSelector,
    organizationModelSelector, organizationRankedRolesSelector
} from "@titan/store/organization";
import {HorizontalScrollViewport} from "@titan/components/scroll/horizontal_scroll_viewport";
import {AppState} from "@titan/store/root_reducer";
import {OrganizationCard} from "@titan/components/organizations/organization_card";
import {Avatar, useTheme} from "@material-ui/core";
import {DashboardSectionHeader} from "@titan/layouts/dashboard/dashboard_section_header";
import {MemberList} from "@titan/components/members/member_list";
import {MemberListRowProps} from "@titan/components/members/member_list_row";
import {ChainOfCommand as ChainOfCommandComponent} from "@titan/modules/organizations/components/chain_of_command";
import {RouteLink} from "@titan/components/routes";

const StyledOrganizationHeader = styled.div`
  align-items: flex-end;
  background: linear-gradient(to bottom, ${props => props.blendcolor} 0%, transparent 15%, transparent 50%, ${props => props.blendcolor} 100%), url(${props => props.image}) no-repeat center;
  background-size: cover;
  display: flex;
  height: 95vh;
  margin-top: -85px;
`;

const StyledViewportWrapper = styled.div`
  margin-top: -72px;
`;

const StyledOrganizationDetailsWrapper = styled.div`
  margin-top: 24px;
`;

const StyledAvatar = styled(Avatar)`
  height: 3.5rem;
  margin-right: 8px;
  width: 3.5rem;
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(-24);
  }

  50% {
    transform: translateY(16px);
  }

  100% {
    transform: translateY(0px);
  }
`;

const StyledHeadline = styled.div`
  align-content: space-between;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -48px;

  h1 {
    font-size: 3.5rem;
    display: flex;
    position: relative;
  }
  
  .scroll-indicator {
    animation: ${floatAnimation} 1600ms ease-in-out infinite;
    color: ${props => props.indicatorColor};
    font-size: 3.5rem;
  }
`;

export function OrganizationScene() {
    const theme = useTheme();
    const leadership = useSelector<AppState, MemberListRowProps[]>(
        state =>
            organizationRankedRolesSelector(state)
                .map(role => ({role, user: role.userProfile})));
    const users = useSelector<AppState, MemberListRowProps[]>(
        state => organizationMembersSelector(state)
            .map(member => ({user: member})));
    const chainOfCommand = useSelector<AppState, OrganizationRoleWithAssoc[]>(organizationChainOfCommandSelector);
    const children = useSelector<AppState, Organization[]>(organizationChildrenSelector);
    const organization = useSelector<AppState, Organization>(organizationModelSelector);

    return (
        <React.Fragment>
            <StyledOrganizationHeader
                image={organization.bannerImageUrl}
                blendcolor={theme.palette.background.default}>
                <DashboardSection>
                    <StyledHeadline indicatorColor={theme.palette.primary.main}>
                        <h1>
                            <StyledAvatar src={organization.avatarUrl} />
                            <span>{organization.name}</span>
                        </h1>
                        <div className="scroll-indicator">
                            <i className="far fa-angle-double-down" />
                        </div>
                    </StyledHeadline>
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
            <StyledOrganizationDetailsWrapper>
                <DashboardSection>
                    {chainOfCommand.length > 0 && (
                        <React.Fragment>
                            <DashboardSectionHeader links={[
                                <RouteLink
                                    key="manage-leadership"
                                    to={`/dashboard/organizations/${organization.id}/leadership`}>Manage</RouteLink>
                            ]}>Leadership</DashboardSectionHeader>
                            <ChainOfCommandComponent
                                chainOfCommand={chainOfCommand}
                            />
                        </React.Fragment>
                    )}

                    {users.length > 0 && (
                        <React.Fragment>
                            <DashboardSectionHeader actions={[
                            ]}>Members</DashboardSectionHeader>
                            <MemberList members={users} />
                        </React.Fragment>
                    )}
                </DashboardSection>
            </StyledOrganizationDetailsWrapper>
        </React.Fragment>
    );
}
