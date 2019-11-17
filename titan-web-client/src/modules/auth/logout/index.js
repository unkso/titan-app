import React, { useEffect } from 'react';
import { useCookies } from 'titan/hooks/cookies';
import * as authActions from 'titan/actions/authActions';
import { useDispatch } from 'react-redux';
import { useConfig } from 'titan/hooks/config';

/**
 * @return {null}
 */
export function LogoutScene () {
  const config = useConfig();
  const cookies = useCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    cookies.remove('wcf21_password', {
      path: '/',
      domain: config.get('woltlab.cookie.domain')
    });
    cookies.remove('wcf21_userID', {
      path: '/',
      domain: config.get('woltlab.cookie.domain')
    });
    cookies.remove('wcf21_cookieHash', {
      path: '/',
      domain: config.get('woltlab.cookie.domain')
    });

    dispatch(authActions.logout());
    window.location = '/auth/login';
  }, []);

  return null;
}
