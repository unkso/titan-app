import React from 'react';
import {Link as RouterDomLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

const AdapterLink = React.forwardRef((props, ref) => (
  <RouterDomLink innerRef={ref} {...props} />
));

export const RouteButton = React.forwardRef<any, any>(
  (props, ref) => <Link underline="none" innerRef={ref} component={AdapterLink} {...props} />);

export const RouteLink = React.forwardRef<any, any>(
  (props, ref) => <Link innerRef={ref} component={AdapterLink} {...props} />);
