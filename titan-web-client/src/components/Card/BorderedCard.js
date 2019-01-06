import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper/Paper';

/**
 * The <Paper> component renders a <div>, which will not allow non-standard
 * DOM attributes. Thus, the "actionable" prop will cause an error. Extract
 * the "actionable" prop away from the other props to prevent it from being
 * passed to <Paper> directly.
 *
 * @link https://github.com/styled-components/styled-components/issues/1198#issuecomment-425650423
 */
export const BorderedCardStyle = styled(
  ({
    actionable,
    highlightTop,
    highlightRight,
    highlightBottom,
    highlightLeft,
    ...props
  }) => <Paper {...props} />)`
  cursor: ${props => props.actionable ? 'pointer' : 'normal'};
  transition: box-shadow 200ms ease-in-out;
  border-top: ${props => props.highlightTop
    ? `3px solid ${props.highlightTop}`
    : '1px solid #e1e1e1'};
  
  border-right: ${props => props.highlightRight
    ? `3px solid ${props.highlightRight}`
    : '1px solid #e1e1e1'};
  
  border-bottom: ${props => props.highlightBottom
    ? `3px solid ${props.highlightBottom}`
    : '1px solid #e1e1e1'};
  
  border-left: ${props => props.highlightLeft
    ? `3px solid ${props.highlightLeft}`
    : '1px solid #e1e1e1'};
`;

class BorderedCard extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      elevation: this.props.elevation
    };
  }

  updateElevation (isHovering) {
    this.setState({
      elevation: isHovering ? this.props.hoverElevation : this.props.elevation
    });
  }

  render () {
    const actionable = this.props.href !== null || this.props.onClick !== null;
    const card = (
      <BorderedCardStyle
        actionable={actionable}
        onClick={this.props.onClick}
        elevation={this.state.elevation}
        highlightTop={this.props.highlightTop}
        highlightRight={this.props.highlightRight}
        highlightBottom={this.props.highlightBottom}
        highlightLeft={this.props.highlightLeft}
        onMouseOver={() => { this.updateElevation(true); }}
        onMouseLeave={() => { this.updateElevation(false); }}>
        {this.props.children}
      </BorderedCardStyle>
    );

    if (this.props.href) {
      return (<a href={this.props.href}>{card}</a>);
    }

    return card;
  }
}

BorderedCard.propTypes = {
  elevation: PropTypes.number,
  hoverElevation: PropTypes.number,
  highlightTop: PropTypes.string,
  highlightRight: PropTypes.string,
  highlightBottom: PropTypes.string,
  highlightLeft: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string
};

BorderedCard.defaultProps = {
  elevation: 0,
  highlightTop: null,
  highlightRight: null,
  highlightBottom: null,
  highlightLeft: null,
  hoverElevation: 5,
  onClick: null,
  href: null
};

export default BorderedCard;
