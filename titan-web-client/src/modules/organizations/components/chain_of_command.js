import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  MemberNameTag,
  StyledMemberNameTag
} from '@titan/components/members/member_name_tag';
import { routeBuilder } from '@titan/lib/routes';
import { ORGANIZATIONS_DETAIL_ROUTE } from '@titan/modules/organizations/routes';
import { RouteLink } from '@titan/components/routes';
import { useTheme } from '@material-ui/core';
import { Palette } from '@titan/themes/default';



const StyledLeaf = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 8px;
  
  .leaf-content {
    background: ${props => props.background};
    border-radius: 4px;
    padding: 8px;
  }

  ${StyledMemberNameTag} {
    z-index: 1;
  }
  
  :before {
    background: ${props => props.branchColor};
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
    align-items: center;
    flex-direction: column;
    margin-bottom: 28px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 8px;
    width: 100%;
    z-index: 1;

    :after {
      left: calc(50% - 8px);
      top: 98%;
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
`;


/*ChainOfCommandComponent.propTypes = {
  /!**
   * Chain of command for the current organization. The entry at index
   * 0 is highest ranking member of the local CoC.
   *!/
  localCoc: PropTypes.arrayOf(PropTypes.object).isRequired,

  /!**
   * Chain of command for above the current organization. The entry at
   * index 0 is highest ranking member of the extended CoC.
   *!/
  extendedCoc: PropTypes.arrayOf(PropTypes.object).isRequired
};*/

const StyledTree = styled.div`
  padding-bottom: 16px;
  position: relative;

  :after {
    border-radius: 4px;
    background-color: ${props => props.trunkColor};
    content: '';
    height: 100%;
    left: calc(50% - 2px);
    position: absolute;
    top: 0;
    width: 4px;
  }
`;

const ExtendedCocToggle = styled.section`
  margin: 10px;
  position: relative;
  text-align: center;
  z-index: 2;
`;

export function ChainOfCommand(props) {
  const theme = useTheme();
  const [extendedCocVisible, setExtendedCocVisible] = useState(false);
  const renderLeaf = (coc, color, index, isLocal = false) => {
    let leafPosition;
    let avatarPosition;
    if (index === 0) {
      avatarPosition = 'top';
      leafPosition = 'top';
    } else if (index % 2 === 0) {
      avatarPosition = 'right';
      leafPosition = 'left';
    } else {
      avatarPosition = 'left';
      leafPosition = 'right';
    }
    const orgRoute = routeBuilder(
      ORGANIZATIONS_DETAIL_ROUTE, [coc.organization.slug]);
    return (
      <StyledLeaf
        key={index}
        branchColor={Palette.background['200']}
        background={theme.palette.background.paper}
        className={`leaf ${leafPosition}`}>
        <div className="leaf-content">
          <MemberNameTag
            avatarUrl={coc.userProfile.wcf.avatarUrl}
            avatarPosition={avatarPosition}
            label={(isLocal
                ? <RouteLink to={orgRoute}>{coc.role}</RouteLink>
                : coc.role
            )}
            labelPosition="below"
            username={coc.userProfile.wcf.username}
            size="large"
          />
        </div>
      </StyledLeaf>
    );
  }

  let index = -1;
  const extendedCoc = props.extendedCoc.map(coc => {
    index++;
    return renderLeaf(
      coc, theme.palette.primary.light, index, true);
  });
  const localCoc = props.localCoc.map(coc => {
    index++;
    return renderLeaf(
      coc, theme.palette.primary.main, index);
  });
  const extendedCoCButtonLabel = extendedCocVisible
    ? 'hide extended CoC'
    : 'show extended CoC';

  return (
    <React.Fragment>
      <StyledTree trunkColor={theme.palette.background.paper}>
        {extendedCoc.length > 0 &&
        <React.Fragment>
          {(extendedCocVisible || localCoc.length === 0) && (
            <React.Fragment>
              { extendedCoc }
            </React.Fragment>
          )}

          {localCoc.length > 0 &&
          <ExtendedCocToggle>
            <Button
              color="secondary"
              size="small"
              variant="outlined"
              onClick={() => setExtendedCocVisible(!extendedCocVisible)}>
              {extendedCoCButtonLabel}
            </Button>
          </ExtendedCocToggle>
          }
        </React.Fragment>
        }

        {localCoc}
      </StyledTree>
    </React.Fragment>
  );
}
