import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button/Button';

const LoginFormStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 20px;
  position: relative;
  top: -15%;
`;

class WoltlabLoginForm extends React.Component {
  render () {
    return (
      <LoginFormStyle>
        <h1>Titan Login</h1>
        {this.props.loading
          ? (<p>Loading...</p>)
          : (
            <div>
              <p>Click the button below to login to our forums. Then refresh this page. If you are already logged in to the forums, sign out then sign back in. You should only have to do this once.</p>
              <div>
                <Button variant="contained" color="primary" href={this.props.loginLink} target="blank">Login to Forums</Button>
                <Button onClick={() => { window.location.reload(); }}>Refresh page</Button>
              </div>
            </div>
          )
        }
      </LoginFormStyle>
    );
  }
}

WoltlabLoginForm.propTypes = {
  loading: PropTypes.bool,
  loginLink: PropTypes.string
};

export default WoltlabLoginForm;
