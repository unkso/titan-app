import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EmptyStateWrapper = styled.div`
  margin: ${props => `${props.verticalMargin}px ${props.horizontalMargin}px`};
  text-align: center;
`;

class IconEmptyStateComponent extends React.Component {
  render () {
    return (
      <EmptyStateWrapper
        horizontalMargin={this.props.horizontalMargin}
        verticalMargin={this.props.verticalMargin}>
        <FontAwesomeIcon
          icon={this.props.icon}
          size="lg"
          style={{
            color: this.props.theme.palette.secondary.light,
            fontSize: '4em',
            marginBottom: '8px'
          }} />
        <Typography variant="h4">{this.props.primaryText}</Typography>
        <Typography variant="body1" color="textSecondary">{this.props.secondaryText}</Typography>
      </EmptyStateWrapper>
    );
  }
}

IconEmptyStateComponent.propTypes = {
  horizontalMargin: PropTypes.number,
  icon: PropTypes.string.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  verticalMargin: PropTypes.number
};

IconEmptyStateComponent.defaultProps = {
  horizontalMargin: 8,
  verticalMargin: 8
};

export const IconEmptyState = withTheme(IconEmptyStateComponent);
