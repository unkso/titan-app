import React, { useEffect, useState } from 'react';
import WithConfig from 'titan/components/core/WithConfig';
import WoltlabLoginForm from './../components/WoltlabLoginForm';
import * as authActions from 'titan/actions/authActions';
import { useCookie } from 'titan/hooks/cookies';
import { useDispatch, useSelector } from 'react-redux';
import { makeTitanApiRequest, WoltlabLoginRequest } from 'titan/http/ApiClient';

export function WoltlabLoginContainer (props) {
  const wcfUserIdCookie = useCookie('wcf21_userID', {
    domain: props.config.get('woltlab.cookie.domain')
  });
  const wcfPasswordTokenCookie = useCookie('wcf21_password', {
    domain: props.config.get('woltlab.cookie.domain')
  });
  const [loading, setLoading] = useState(true);
  const session = useSelector(state => state.auth.session);
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      window.location = '/organizations';
      return;
    }

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
  }, [wcfUserIdCookie, wcfPasswordTokenCookie]);

  return (
    <WoltlabLoginForm
      loading={loading}
      loginLink={props.config.get('woltlab.authUrl')}
    />
  );
}

export default WithConfig(WoltlabLoginContainer);
