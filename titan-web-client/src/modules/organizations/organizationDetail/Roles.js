import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import { Container, Draggable } from 'react-smooth-dnd';
import styled, { createGlobalStyle } from 'styled-components';
import {
  ListOrganizationRolesRequest,
  makeTitanApiRequest,
  ReorderOrganizationRolesRequest,
  ROLE_SCOPES
} from 'titan/http/ApiClient';
import { ContentBlock } from 'titan/components/block/ContentBlock';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { MemberNameTag } from 'titan/components/members/MemberNameTag';
import ListItem from '@material-ui/core/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import * as orgActions from 'titan/actions/organizationActions';
import { useSnackbar } from 'notistack';
import useTheme from '@material-ui/core/styles/useTheme';

export const StyledListItem = styled(ListItem)`
  &:hover {
    background: ${props => props.hoverbg};
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
    background: #fff;
    box-shadow: ${props => props.dragElShadow};
  }

 .dragging-role ${StyledRole} {
    .report-to-indicator {
      display: block;
    }
    
    .role-name {
      display: none;
    }
  }
`;

export function Roles (props) {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.organization.roles || []);
  const snackbar = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    makeTitanApiRequest(ListOrganizationRolesRequest,
      { orgId: props.organization.id, scope: ROLE_SCOPES.RANKED })
      .then(res => {
        dispatch(orgActions.setRoles(res.data));
      });
  }, [props.organization.id]);

  function updateRoleOrder (dropResult) {
    const previousRoles = [...roles];
    const reorderedRoles = [...roles];
    const tmp = reorderedRoles[dropResult.removedIndex];
    reorderedRoles[dropResult.removedIndex] = reorderedRoles[dropResult.addedIndex];
    reorderedRoles[dropResult.addedIndex] = tmp;
    dispatch(orgActions.setRoles(reorderedRoles));
    makeTitanApiRequest(ReorderOrganizationRolesRequest,
      { orgId: props.organization.id, roleIds: reorderedRoles.map(role => role.id) })
      .then(() => {
        snackbar.enqueueSnackbar('Saved', { variant: 'success' });
      })
      .catch(() => {
        // If the reorder fails, restore the previous order.
        dispatch(orgActions.setRoles(previousRoles));
        snackbar.enqueueSnackbar('Failed to reorder roles', { variant: 'error' });
      });
  }

  return (
    <React.Fragment>
      <GlobalStyle dragElShadow={theme.shadows[4]} />
      <ContentBlock>
        <Card>
          <CardHeader title="Chain of Command" />
          <CardContent>
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
                            <div className="report-to-indicator">
                              Reports to <span className="far fa-level-up" />
                            </div>
                            <span className="role-name">{role.role}</span>
                          </div>
                        </StyledRole>
                      </ListItemText>
                    </StyledListItem>
                  </Draggable>
                );
              })}
            </Container>
            }
          </CardContent>
        </Card>
      </ContentBlock>
    </React.Fragment>
  );
}
