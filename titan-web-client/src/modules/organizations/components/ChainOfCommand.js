import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MatAvatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const Avatar = styled(MatAvatar)``;
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
  
  ${Avatar} {
    background: #ccc;
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

  &.left:first-child,
  &.right:first-child {
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
    
    ${Avatar} {
      margin: auto;
    }
    
    .user-details {
      text-align: center;
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
    
    ${Avatar} {
      margin: 0 16px 0 8px;
    }
    
    .user-details {
      text-align: right;
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
    
    ${Avatar} {
      margin: 0 8px 0 16px;
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

  renderLeaf (coc, color, index) {
    const side = index % 2 ? 'left' : 'right';
    return (
      <Leaf
        key={index}
        branchColor={color}
        className={`leaf ${side}`}>
        <Avatar
          style={{ width: 50, height: 50 }}
          src={coc.user_profile.wcf.avatar_url}
        />
        <div className="user-details">
          <Typography>{coc.user_profile.wcf.username}</Typography>
          <Typography color="textSecondary">{coc.role}</Typography>
        </div>
      </Leaf>
    );
  }

  render () {
    let index = 0;
    const extendedCoc = this.props.extendedCoc.map(coc => {
      index++;
      return this.renderLeaf(
        coc, this.props.theme.palette.primary.main, index);
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
