import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  MemberNameTag,
  StyledMemberNameTag
} from '@titan/components/members/member_name_tag';
import { routeBuilder } from '@titan/lib/routes';
import { ORGANIZATIONS_DETAIL_ROUTE } from '@titan/modules/organizations/routes';
import { RouteLink } from '@titan/components/routes';
import { useTheme } from '@material-ui/core';
import { Palette } from '@titan/themes/default';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const StyledExpandButton = styled(Button)`
  display: block;
  margin: auto;
`;

const StyledLeaf = styled.div`
  display: flex;
  position: relative;
  z-index: 1;

  :before {
    background: ${props => props.branchColor};
    border-radius: 4px;
    content: '';
    height: 3px;
    position: absolute;
    top: 50%;
    width: 12px;
  }
  
  :after {
    border: 3px solid ${props => props.branchColor};
    border-radius: 50%;
    content: '';
    height: 10px;
    position: absolute;
    top: calc(50% - 4px);
    width: 10px;
    z-index: 1;
  }

  &.top {
    justify-content: center;
    margin-bottom: 28px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 8px;
    width: 100%;
    top: -8px;
    z-index: 1;

    :after {
      left: calc(50% - 5px);
      top: 100%;
    }
    
    :before {
      display: none;
    }
    
    ${StyledMemberNameTag} {
      margin: auto;
    }
  }

  &.bottom {
    justify-content: center;
    margin-bottom: 28px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 8px;
    width: 100%;
    z-index: 1;

    :after {
      left: calc(50% - 5px);
      top: -10%;
    }
    
    :before {
      display: none;
    }
    
    ${StyledMemberNameTag} {
      margin: auto;
    }
  }

  &.left {
    flex-direction: row-reverse;
    margin-right: calc(50% + 16px);
    
    :after {
      right: -21px;
    }
    
    :before {
      right: -12px;
    }
    
    .leaf-content {
      display: flex;
      justify-content: flex-end;
    }
  }

  &.right {
    margin-left: calc(50% + 16px);
    
    :after {
      left: -21px;
    }
    
    :before {
      left: -12px;
    }
  }
  
  .leaf-content {
    background: ${props => props.background};
    border-radius: 4px;
    min-width: 250px;
    padding: 8px;
    transition: background-color 175ms ease-in-out;

    &:hover {
      background-color: ${props => props.hoverBackground};
    }
  }

  ${StyledMemberNameTag} {
    z-index: 1;
  }
`;

const StyledTree = styled.div`
  padding-bottom: 16px;
  position: relative;

  :after {
    border-radius: 4px;
    background-color: ${props => props.trunkColor};
    content: '';
    height: 78%;
    left: calc(50% - 2px);
    position: absolute;
    top: 0;
    width: 4px;
  }
`;

export function ChainOfCommand(props) {
  const theme = useTheme();
  const [fullChainOfCommandLeaves, setFullChainOfCommandLeaves] = useState([]);
  const [previewChainOfCommandLeaves, setPreviewChainOfCommandLeaves] = useState([]);
  const [remainingCount, setRemainingCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // The {@link props.chainOfCommand} property orders roles from
    // lowest rank to highest, but they need to be rendered in highest
    // to lowest order instead.
    const reversed = [...props.chainOfCommand].reverse();
    const slice = reversed.slice(0, 3);
    setFullChainOfCommandLeaves(reversed.map(
      (role, index) =>
        renderLeaf(role, theme.palette.primary.light, index, true, true)));
    setPreviewChainOfCommandLeaves(slice.map(
      (role, index) =>
        renderLeaf(role, theme.palette.primary.light, index, false, false)));
    setRemainingCount(Math.max(0, props.chainOfCommand.length - 3));
  }, [props.chainOfCommand]);

  const renderLeaf = (coc, color, index, capTop, inDialog) => {
    let leafPosition;
    let avatarPosition;
    if (capTop && index === 0) {
      avatarPosition = 'top';
      leafPosition = 'top';
    } else if (index === props.chainOfCommand.length - 1) {
      avatarPosition = 'top';
      leafPosition = 'bottom';
    } else if (index % 2 === 0) {
      avatarPosition = 'left';
      leafPosition = 'right';
    } else {
      avatarPosition = 'right';
      leafPosition = 'left';
    }

    let background = theme.palette.background.default;
    let hoverBackground = theme.palette.background.paper;
    if (inDialog) {
      background = 'transparent';
      hoverBackground = 'transparent';
    }

    const orgRoute = routeBuilder(
      ORGANIZATIONS_DETAIL_ROUTE, [coc.organization.id]);
    return (
      <StyledLeaf
        key={index}
        branchColor={Palette.background['200']}
        background={background}
        hoverBackground={hoverBackground}
        className={`leaf ${leafPosition}`}>
        <div className="leaf-content">
          <MemberNameTag
            avatarUrl={coc.userProfile.wcf.avatarUrl}
            avatarPosition={avatarPosition}
            label={<RouteLink to={orgRoute}>{coc.role}</RouteLink>}
            labelPosition="below"
            username={coc.userProfile.wcf.username}
            size="large"
          />
        </div>
      </StyledLeaf>
    );
  }

  return (
    <React.Fragment>
      {remainingCount > 0 &&  (
        <StyledExpandButton
          onClick={() => setDialogOpen(true)}
          size="small">+{remainingCount} more</StyledExpandButton>
      )}
      <StyledTree trunkColor={theme.palette.background.paper}>
        {previewChainOfCommandLeaves}
      </StyledTree>
      <Dialog fullWidth maxWidth="sm" open={dialogOpen}>
        <DialogTitle>Chain of Command</DialogTitle>
        <DialogContent>
          <StyledTree trunkColor={Palette.background[300]}>
            {fullChainOfCommandLeaves}
          </StyledTree>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
