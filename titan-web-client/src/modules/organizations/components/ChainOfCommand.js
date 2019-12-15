import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { RouteLink } from '@titan/components/Routes/RouteLink';
import { ORGANIZATION_DETAILS_ROUTE, routeBuilder } from '@titan/routes';
import {
  MemberNameTag,
  StyledMemberNameTag
} from '@titan/components/members/MemberNameTag';

const Tree = styled.div`
  padding-bottom: 16px;
  position: relative;

  :after {
    border-radius: 4px;
    background-color: #ccc;
    content: '';
    height: 100%;
    left: calc(50% - 2px);
    position: absolute;
    top: 0;
    width: 4px;
  }
`;

const Leaf = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 8px;
  
  ${StyledMemberNameTag} {
    z-index: 1;
  }
  
  :before {
    background: ${props => props.branchColor};
    content: '';
    height: 3px;
    position: absolute;
    top: 23px;
    width: 12px;
  }
  
  :after {
    background-color: #fff;
    border: 3px solid ${props => props.branchColor};
    border-radius: 50%;
    content: '';
    position: absolute;
    top: 16px;
    height: 10px;
    width: 10px;
    z-index: 1;
  }

  &.top {
    align-items: center;
    background: #fff;
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
    margin-right: 50%;
    
    :after {
      right: -8px;
    }
    
    :before {
      right: 8px;
    }
    
    ${StyledMemberNameTag} {
      margin-right: 16px;
    }
  }

  &.right {
    margin-left: 50%;
    
    :after {
      left: -8px;
    }
    
    :before {
      left: 8px;
    }
    
    ${StyledMemberNameTag} {
      margin-left: 16px;
    }
  }
`;

const ExtendedCocToggle = styled.section`
  background-color: #fff;
  margin: 10px;
  position: relative;
  text-align: center;
  z-index: 2;
`;

class ChainOfCommandComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = { extendedCocVisible: false };
  }

  toggleExtendedCoc () {
    this.setState({
      extendedCocVisible: !this.state.extendedCocVisible
    });
  }

  renderLeaf (coc, color, index, isLocal = false) {
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
      ORGANIZATION_DETAILS_ROUTE, [coc.organization.slug]);
    return (
      <Leaf
        key={index}
        branchColor={color}
        className={`leaf ${leafPosition}`}>
        <MemberNameTag
          avatarUrl={coc.user_profile.wcf.avatar_url}
          avatarPosition={avatarPosition}
          label={(isLocal
            ? <RouteLink to={orgRoute}>{coc.role}</RouteLink>
            : coc.role
          )}
          labelPosition="below"
          username={coc.user_profile.wcf.username}
          size="large"
        />
      </Leaf>
    );
  }

  render () {
    let index = -1;
    const extendedCoc = this.props.extendedCoc.map(coc => {
      index++;
      return this.renderLeaf(
        coc, this.props.theme.palette.primary.main, index, true);
    });
    const localCoc = this.props.localCoc.map(coc => {
      index++;
      return this.renderLeaf(
        coc, this.props.theme.palette.secondary.light, index);
    });
    const extendedCoCButtonLabel = this.state.extendedCocVisible
      ? 'hide extended CoC'
      : 'show extended CoC';

    return (
      <React.Fragment>
        <Tree>
          {extendedCoc.length > 0 &&
            <React.Fragment>
              {(this.state.extendedCocVisible || localCoc.length === 0) && (
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
                  onClick={() => this.toggleExtendedCoc()}>
                  {extendedCoCButtonLabel}
                </Button>
              </ExtendedCocToggle>
              }
            </React.Fragment>
          }

          {localCoc}
        </Tree>
      </React.Fragment>
    );
  }
}

ChainOfCommandComponent.propTypes = {
  /**
   * Chain of command for the current organization. The entry at index
   * 0 is highest ranking member of the local CoC.
   */
  localCoc: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * Chain of command for above the current organization. The entry at
   * index 0 is highest ranking member of the extended CoC.
   */
  extendedCoc: PropTypes.arrayOf(PropTypes.object).isRequired
};

ChainOfCommandComponent.defaultProps = {
  userCount: 0
};

export const ChainOfCommand = withTheme(ChainOfCommandComponent);
