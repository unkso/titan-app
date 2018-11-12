import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

class PageHeaderTitle extends React.Component {
  render () {
    return (
      <div>
        <Typography variant="h1">{this.props.title}</Typography>
      </div>
    );
  }
}

PageHeaderTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageHeaderTitle;
