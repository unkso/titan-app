import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper/Paper';

export const BorderedCardStyle = styled(Paper)`
  border: 1px solid #e1e1e1;
  transition: box-shadow 200ms ease-in-out;
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
    return (
      <BorderedCardStyle
        elevation={this.state.elevation}
        onMouseOver={() => { this.updateElevation(true); }}
        onMouseLeave={() => { this.updateElevation(false); }}>
        {this.props.children}
      </BorderedCardStyle>
    );
  }
}

BorderedCard.propTypes = {
  elevation: PropTypes.number,
  hoverElevation: PropTypes.number
};

BorderedCard.defaultProps = {
  elevation: 0,
  hoverElevation: 5
};

export default BorderedCard;
