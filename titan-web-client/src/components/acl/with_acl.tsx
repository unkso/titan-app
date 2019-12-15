import React, {FunctionComponent} from 'react';
import { useSelector } from 'react-redux';
import { createAclInstanceFromSession } from '@titan/lib/acl';

interface AuthUserOptions {
  userId: number;
  mustHaveOptions: boolean;
}

interface WithAclProps {
  /**
   * If specified, the authenticated user must have the given user Id
   * and/or all the specified ACL options.
   */
  authUserOptions: AuthUserOptions;
  userId: number;
  mustHaveOptions: boolean;
  options: string[];
  mustHaveAllOptions: boolean;
}

/**
 * Conditionally renders children if all the given ACL permissions
 * are present in the current user's session.
 */
export const WithAcl: FunctionComponent<WithAclProps> = (props) => {
  const auth = useSelector(state => state.auth);
  const canAccess =
      createAclInstanceFromSession(auth.session)
        .canAccess(props.options, props.authUserOptions || null,
          props.mustHaveAllOptions || false);

  if (canAccess) {
    return (
      <>{props.children}</>
    );
  }

  return null;
};
