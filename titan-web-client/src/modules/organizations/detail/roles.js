import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import { Container, Draggable } from 'react-smooth-dnd';
import styled, { createGlobalStyle } from 'styled-components';
import { ROLE_SCOPES } from '@titan/http/api_client';
import { ContentBlock } from '@titan/components/block/content_block';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { MemberNameTag } from '@titan/components/members/member_name_tag';
import ListItem from '@material-ui/core/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import * as orgActions from '@titan/actions/organization_actions';
import { useSnackbar } from 'notistack';
import useTheme from '@material-ui/core/styles/useTheme';
import { AddRoleButton } from '@titan/components/roles/add_role_button';
import { getUserMessageFromError } from '@titan/lib/response';
import { TitanApiClient } from '@titan/http/api';

export const StyledListItem = styled(ListItem)`
  &:hover {
    //background: ${props => props.hoverbg};
  }
  
  .assignee-placeholder {
    font-style: italic;
  }
  
  .report-to-indicator {
    border-radius: 3px;
    color: ${props => props.indicatortextcolor};
    display: inline-block;
    font-size: 12px;
    font-weight: 500;
    font-style: italic;
    padding: 0 3px;
  }
`;

export const StyledRole = styled.div`
  align-items: center;
  display: flex;
  min-height: 40px;

  .drag-handle {
    cursor: row-resize;
    margin-right: 8px;
  }
  
  .role-details {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
  
  .report-to-indicator {
    display: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  .dragging-role {
    background: ${props => props.dragElBackground};
    box-shadow: ${props => props.dragElShadow};
  }

 .dragging-role ${StyledRole} {
    .report-to-indicator {
      display: block;
    }
    
    .edit-icon {
      display: none;
    }
  }
`;

export function Roles (props) {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const snackbar = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    TitanApiClient.getOrganizationsOrgIdRoles({orgId: props.orgId, scope: ROLE_SCOPES.RANKED})
      .subscribe(roles => {
        setRoles(roles);
      });
  }, [props.orgId, dispatch]);

  function updateRoleOrder (dropResult) {
    const previousRoles = [...roles];
    const reorderedRoles = [...roles];
    const tmp = reorderedRoles[dropResult.removedIndex];
    reorderedRoles.splice(dropResult.removedIndex, 1);
    reorderedRoles.splice(dropResult.addedIndex, 0, tmp);
    for (let x = 0; x < reorderedRoles.length; x++) {
      reorderedRoles[x] = { ...reorderedRoles[x], rank: x };
    }
    setRoles([...reorderedRoles]);

    TitanApiClient.postOrganizationsOrgIdRolesReorder({
      orgId: props.orgId,
      reorderOrganizationRolesFields: {
        roleIds: reorderedRoles.map(role => role.id),
      },
    }).subscribe(() => {
      snackbar.enqueueSnackbar('Saved', { variant: 'success' });
    }, (err) => {
      // If the reorder fails, restore the previous order.
      setRoles(previousRoles);
      snackbar.enqueueSnackbar(getUserMessageFromError(err, 'Failed to reorder roles'), { variant: 'error' });
    });
  }

  return (
    <React.Fragment>
      <GlobalStyle
        dragElBackground={theme.palette.background.paper}
        dragElShadow={theme.shadows[4]}
      />
            {roles &&
            <Container
              lockAxis="y"
              dragHandleSelector=".drag-handle"
              getChildPayload={i => roles[i]}
              dragClass="dragging-role"
              onDrop={res => updateRoleOrder(res)}>
              {roles.filter(role => role.rank !== null).map(role => {
                return (
                  <Draggable key={role.id}>
                    <StyledListItem
                      component="div"
                      hoverbg={theme.palette.grey[100]}
                      indicatortextcolor={theme.palette.text.disabled}>
                      <ListItemText>
                        <StyledRole>
                          <span className="drag-handle">
                            <span className="fal fa-grip-lines-vertical" />
                          </span>
                          <div className="role-details">
                            {role.user_profile ? (
                              <MemberNameTag
                                avatarUrl={role.user_profile.wcf.avatar_url}
                                avatarPosition="left"
                                size="small"
                                username={role.user_profile.username}
                              />
                            ) : (
                              <div className="assignee-placeholder">Unassigned</div>
                            )}
                            <span>{role.role}</span>
                            <div className="report-to-indicator">
                              Reports to <span className="far fa-level-up" />
                            </div>
                            <AddRoleButton
                              orgId={props.orgId}
                              roleId={role.id}
                              roleName={role.role}
                              roleAssignee={role.user_profile}
                            />
                          </div>
                        </StyledRole>
                      </ListItemText>
                    </StyledListItem>
                  </Draggable>
                );
              })}
            </Container>
            }
    </React.Fragment>
  );
}
