import React from 'react';
import RouterDomLink from 'react-router-dom/Link';
import Link from '@material-ui/core/Link';

const AdapterLink = React.forwardRef((props, ref) => (
  <RouterDomLink innerRef={ref} {...props} />
));

export const RouteButton = React.forwardRef(
  (props, ref) => <Link underline="none" innerRef={ref} component={AdapterLink} {...props} />);

export const RouteLink = React.forwardRef(
  (props, ref) => <Link innerRef={ref} component={AdapterLink} {...props} />);
