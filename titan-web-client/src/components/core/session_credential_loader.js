import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import {
  AuthWoltlabLoginRequest,
  makeTitanApiRequest
} from '@titan/http/api_client';
import titanConfig from '@titan/config';
import * as authActions from '@titan/actions/auth_actions';
import { useCookie } from '@titan/hooks/cookies';

const StyledLoaderContainer = styled.div`
  position: absolute;
    align-items: center;
    display: flex;
    justify-content: center;
    left: calc(50% - 20px);
    top: calc(50% - 20px);
`;

export function SessionCredentialLoader (props) {
  const wcfUserIdCookie = useCookie('wcf21_userID', {
    domain: titanConfig.get('woltlab.cookie.domain')
  });
  const wcfPasswordTokenCookie = useCookie('wcf21_password', {
    domain: titanConfig.get('woltlab.cookie.domain')
  });
  const dispatch = useDispatch();
  const authUser = useSelector(
    state => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Refreshing user credentials and permissions can have the
    // side-effect of signing in the user. To avoid conflicting
    // with the login view, check if the user is logged in already
    // before attempting to refresh credentials.
    if (!authUser || !wcfUserIdCookie || !wcfPasswordTokenCookie) {
      setLoading(false);
      return;
    }

    const authRequest = makeTitanApiRequest(AuthWoltlabLoginRequest, {
      userId: parseInt(wcfUserIdCookie, 10),
      wcfPasswordTokenCookie
    });

    authRequest
      .then(res => {
        dispatch(authActions.login(res.data));
      })
      .catch(() => {
        // Do nothing. If there is an issue with the user's
        // credentials, the subsequently loaded auth components will
        // handle it.
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <StyledLoaderContainer>
        <CircularProgress />
      </StyledLoaderContainer>
    );
  }

  return props.children;
}
