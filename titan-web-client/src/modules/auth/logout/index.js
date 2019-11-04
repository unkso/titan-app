import React, { useEffect } from 'react';
import WithConfig from 'titan/components/core/WithConfig';
import { useCookies } from 'titan/hooks/cookies';
import * as authActions from 'titan/actions/authActions';
import { useDispatch } from 'react-redux';

/**
 * @return {null}
 */
export function LogoutScene (props) {
  const cookies = useCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    cookies.remove('wcf21_password', {
      path: '/',
      domain: props.config.get('woltlab.cookie.domain')
    });
    cookies.remove('wcf21_userID', {
      path: '/',
      domain: props.config.get('woltlab.cookie.domain')
    });
    cookies.remove('wcf21_cookieHash', {
      path: '/',
      domain: props.config.get('woltlab.cookie.domain')
    });

    dispatch(authActions.logout());
    window.location = '/auth/login';
  }, []);

  return null;
}

export default WithConfig(LogoutScene);
