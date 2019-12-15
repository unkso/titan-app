import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const Content = styled.div`
  display: ${props => props.open ? 'block' : 'none'};
`;

export class ContentToggle extends React.Component {
  constructor (props) {
    super(props);

    this.state = { open: false };
  }

  toggleContent () {
    this.setState({ open: !this.state.open });
  }

  render () {
    let label = this.state.open
      ? this.props.hideLabel
      : this.props.showLabel;

    return (
      <div>
        <Content open={this.state.open}>
          {this.props.children}
        </Content>
        <Typography align="center">
          <Button
            color="primary"
            onClick={() => this.toggleContent()}>{label}</Button>
        </Typography>
      </div>
    );
  }
}

ContentToggle.propTypes = {
  showLabel: PropTypes.string,
  hideLabel: PropTypes.string
};
