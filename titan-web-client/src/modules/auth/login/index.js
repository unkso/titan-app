import React from 'react'
import styled from 'styled-components'
import WoltlabLoginContainer
  from 'titan/modules/auth/login/containers/WoltlabLoginContainer'

const LoginSceneStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const ArtworkWrapper = styled.div`
  flex: 1;
  background: url("${props => props.image}") center center no-repeat;
  background-size: cover;
  opacity: .3;
`

const LoginFormWrapper = styled.div`
  display: flex;
  flex: 0 0 500px;
  background: #fff;
  box-shadow: -8px 0 25px 10px rgba(0,0,0,1);
`

class LoginScene extends React.Component {
  render () {
    return (
      <LoginSceneStyle>
        <ArtworkWrapper image="/images/battlefield_1_tank.jpg" />
        <LoginFormWrapper>
          <WoltlabLoginContainer />
        </LoginFormWrapper>
      </LoginSceneStyle>
    )
  }
}

export default LoginScene
