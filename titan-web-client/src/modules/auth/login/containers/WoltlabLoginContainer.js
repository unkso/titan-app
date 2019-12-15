import React, { useEffect, useState } from 'react';
import WoltlabLoginForm from './../components/WoltlabLoginForm';
import * as authActions from '@titan/actions/auth_actions';
import { useCookies } from '@titan/hooks/cookies';
import { useDispatch, useSelector } from 'react-redux';
import { makeTitanApiRequest, WoltlabLoginRequest } from '@titan/http/ApiClient';
import { useConfig } from '@titan/hooks/config';

export function WoltlabLoginContainer () {
  const config = useConfig();
  const cookies = useCookies();
  const [loading, setLoading] = useState(true);
  const session = useSelector(state => state.auth.session);
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      window.location = '/organizations';
      return;
    }

    const wcfUserIdCookie = cookies.get('wcf21_userID', {
      domain: config.get('woltlab.cookie.domain')
    });
    const wcfPasswordTokenCookie = cookies.get('wcf21_password', {
      domain: config.get('woltlab.cookie.domain')
    });

    if (wcfPasswordTokenCookie && wcfUserIdCookie) {
      makeTitanApiRequest(WoltlabLoginRequest,
        { userId: parseInt(wcfUserIdCookie, 10), token: wcfPasswordTokenCookie })
        .then(res => {
          dispatch(authActions.login(res.data));
          window.location = '/dashboard';
        })
        .catch(() => {
          // TODO Update UI to indicate error state. This will silently hide
          // errors that occur after the request is received, making it
          // difficult to debug.
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [config]);

  return (
    <WoltlabLoginForm
      loading={loading}
      loginLink={config.get('woltlab.authUrl')}
    />
  );
}
