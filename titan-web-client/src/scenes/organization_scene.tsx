import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import {
    ChainOfCommand,
    Organization,
    TitanApiClient, UserProfile,
} from "@titan/http/api";
import {DashboardSection} from "@titan/layouts/dashboard/dashboard_section";
import {useDispatch, useSelector} from "react-redux";
import {
    OrganizationActions, organizationChainOfCommandSelector,
    organizationChildrenSelector, organizationMembersSelector,
    organizationModelSelector, organizationRankedRolesSelector
} from "@titan/store/organization";
import {combineLatest} from "rxjs";
import {HorizontalScrollViewport} from "@titan/components/scroll/horizontal_scroll_viewport";
import {AppState} from "@titan/store/root_reducer";
import {OrganizationCard} from "@titan/components/organizations/organization_card";
import {Avatar, useTheme} from "@material-ui/core";
import {Roles} from "@titan/modules/organizations/detail/roles";
import {AddRoleButton} from "@titan/components/roles/add_role_button";
import {DashboardSectionHeader} from "@titan/layouts/dashboard/dashboard_section_header";
import {MemberList} from "@titan/components/members/member_list";
import {MemberListRowProps} from "@titan/components/members/member_list_row";
import {ChainOfCommand as ChainOfCommandComponent} from "@titan/modules/organizations/components/chain_of_command";

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
    const params = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const leadership = useSelector<AppState, MemberListRowProps[]>(
        state =>
            organizationRankedRolesSelector(state)
                .map(role => ({role, user: role.userProfile})));
    const users = useSelector<AppState, MemberListRowProps[]>(
        state => organizationMembersSelector(state)
            .map(member => ({user: member})));
    const chainOfCommand = useSelector<AppState, ChainOfCommand>(organizationChainOfCommandSelector);
    const children = useSelector<AppState, Organization[]>(organizationChildrenSelector);
    const organization = useSelector<AppState, Organization>(organizationModelSelector);

    useEffect(() => {
        combineLatest([
            TitanApiClient.getOrganization({id: params.id}),
            TitanApiClient.getOrganizationRoles({orgId: params.id}),
            TitanApiClient.getOrganizationChildren({orgId: params.id}),
            TitanApiClient.getOrganizationUsers({orgId: params.id}),
            TitanApiClient.getOrganizationChainOfCommand({orgId: params.id}),
        ]).subscribe(([org, roles, children, users, coc]) => {
            dispatch(OrganizationActions.setOrganization(org));
            dispatch(OrganizationActions.setChildren(children));
            dispatch(OrganizationActions.setRoles(roles));
            dispatch(OrganizationActions.setMembers(users));
            dispatch(OrganizationActions.setChainOfCommand(coc));
        });
        return () => {
            dispatch(OrganizationActions.setOrganization(undefined));
            dispatch(OrganizationActions.setRoles([]));
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
                    {!!chainOfCommand && (
                        <React.Fragment>
                            <DashboardSectionHeader actions={[
                                <AddRoleButton key="add-role-action" orgId={organization.id} />
                            ]}>Leadership</DashboardSectionHeader>
                            <ChainOfCommandComponent
                                localCoc={chainOfCommand.localCoc || []}
                                extendedCoc={chainOfCommand.extendedCoc || []}
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
