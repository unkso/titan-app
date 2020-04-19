import React, { useEffect } from 'react';
import { useCookies } from '@titan/lib/storage/hooks';
import * as authActions from '@titan/actions/auth_actions';
import { useDispatch } from 'react-redux';
import { useConfig } from '@titan/lib/config/hooks';
import { AuthUserActions } from '@titan/store/auth_user';

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

    dispatch(AuthUserActions.logout());
    window.location = '/auth/login';
  }, []);

  return null;
}
