import RouterDomLink from 'react-router-dom/Link';
import Link from '@material-ui/core/Link';
import React from 'react';

const AdapterLink = React.forwardRef((props, ref) => <RouterDomLink innerRef={ref} {...props} />);

export function RouteLink (props) {
  return (
    <Link underline="none"
      component={AdapterLink} {...props}>{props.children}</Link>
  );
}
