import React, {useEffect, useState} from "react";
import {CircularProgress, Fade, Link} from "@material-ui/core";
import styled from 'styled-components';
import {TitanApiClient} from "@titan/http/api";
import {useCookies} from "@titan/lib/storage/hooks";
import {useDispatch} from "react-redux";
import {AuthUserActions} from "@titan/store/auth_user";
import {Callout} from "@titan/components/callout";

const LoginSceneWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  
  .login-status {
    margin-top: 16px;
    text-align: center;
  }
`;

export function LoginScene() {
    const cookies = useCookies();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const wcfUserIdCookie = Number.parseInt(cookies.get('wcf21_userID'));
        const wcfPasswordTokenCookie = String(cookies.get('wcf21_password'));

        if (wcfUserIdCookie && wcfPasswordTokenCookie) {
            TitanApiClient.postAuthWoltlab({
                authWoltlabFields: {
                    wcfUserId: wcfUserIdCookie,
                    cookiePassword: wcfPasswordTokenCookie,
                }
            }).subscribe((loginRes) => {
                localStorage.setItem('titan_credentials', JSON.stringify(loginRes));
                dispatch(AuthUserActions.login(loginRes));
                window.location.href = '/dashboard';
            })
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <LoginSceneWrapper>
            <img
                src="https://clanunknownsoldiers.com/wcf/images/us-theme/logos/unkso_master_logo.PNG"
            />
            <div className="login-status">
                <Fade in={loading}>
                    <CircularProgress />
                </Fade>
                <Fade in={!loading}>
                    <div>
                        <Callout
                            description={(
                                <span>Visit the <Link href="https://clanunknownsoldiers.com/" target="_blank">forums</Link>, log out and login again, then refresh this page.</span>
                            )}
                            title="Unable to sign in"
                            type="warning"
                        />
                    </div>
                </Fade>
            </div>
        </LoginSceneWrapper>
    );
}
