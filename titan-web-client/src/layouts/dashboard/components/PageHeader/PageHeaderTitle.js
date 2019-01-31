import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const PageHeaderTitleStyle = styled.div`
  padding: 16px 24px;
`;

class PageHeaderTitle extends React.Component {
  render() {
    return (
      <PageHeaderTitleStyle>
        <Typography variant="h1">{this.props.title}</Typography>
      </PageHeaderTitleStyle>
    );
  }
}

PageHeaderTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageHeaderTitle;
