import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

/* Styled Components */
import {
  Error,
  GoogleButton,
  FacebookButton
} from './styles/AuthModal';

import { BACKEND_ENDPOINT, GOOGLE_AUTH_ENDPOINT, FACEBOOK_AUTH_ENDPOINT } from '../../../constants/Api';

const SocialLoginContent = ({}) => {
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSuccess = async (res) => {
    const {tokenId, profileObj} = res;
    const {
      email, familyName, givenName, imageUrl
    } = profileObj;
  
    setGoogleLoading(true);
    const responseData = await fetch(`${BACKEND_ENDPOINT}${GOOGLE_AUTH_ENDPOINT}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_token: tokenId,
        email,
        first_name: givenName,
        last_name: familyName,
        picture_url: imageUrl
      })
    });
  
    const response = await responseData.json();
    setError(response.error);
    setGoogleLoading(false);
  };
  
  const handleGoogleFailure = (res) => {
    const errorMessage = res.error === "popup_closed_by_user"
      ? '' : `Unexpected error logging in with Google: ${res.error}`;
    setError(errorMessage);
  };

  const handleFacebookLogin = async (res) => {
    const {tokenId, profileObj} = res;
    const {
      email, familyName, givenName, imageUrl
    } = profileObj;
  
    const responseData = await fetch(`${BACKEND_ENDPOINT}${FACEBOOK_AUTH_ENDPOINT}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_token: tokenId,
        email,
        first_name: givenName,
        last_name: familyName,
        picture_url: imageUrl
      })
    });
  
    const response = await responseData.json();
    setError(response.error);
  };
  
  return (
    <>
      {error === '' ? null : <Error>{error}</Error>}
      <FacebookLogin
        appId="TODO"
        isMobile={false}
        fields="name,email,picture"
        callback={handleFacebookLogin}
        render={(renderProps) => (
          <FacebookButton
            onClick={renderProps.onClick}
            loading={renderProps.isProcessing}
          >
            Continue with Facebook
          </FacebookButton>
        )}
      />
      <GoogleLogin
        clientId="TODO.apps.googleusercontent.com"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        render={(renderProps) => (
          <GoogleButton
            onClick={renderProps.onClick}
            loading={googleLoading}
          >
            Continue with Google
          </GoogleButton>
        )}
      />
    </>
  );
}

export default SocialLoginContent;