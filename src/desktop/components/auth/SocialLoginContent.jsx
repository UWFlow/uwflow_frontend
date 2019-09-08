import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

/* Styled Components */
import {
  Error,
  ButtonText,
  GoogleButton,
  FacebookButton,
  GoogleIcon,
  FacebookIcon
} from './styles/AuthForm';

import {
  BACKEND_ENDPOINT,
  GOOGLE_AUTH_ENDPOINT,
  FACEBOOK_AUTH_ENDPOINT,
  GOOGLE_APP_ID,
  FACEBOOK_APP_ID
} from '../../../constants/Api';
import { makePOSTRequest } from '../../../utils/Api';

const SocialLoginContent = () => {
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const handleFacebookLogin = async (res) => {
    if (!res.accessToken) {
      setError("Error logging in with Facebook");
      return;
    }

    const {accessToken} = res;

    setFacebookLoading(true);

    const [response, status] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${FACEBOOK_AUTH_ENDPOINT}`,
      {
        access_token: accessToken,
      }
    );
    
    // TODO handle response
    setError(response.error);
    setFacebookLoading(false);
  };

  const handleGoogleSuccess = async (res) => {
    const {tokenId} = res;
  
    setGoogleLoading(true);

    const [response, status] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${GOOGLE_AUTH_ENDPOINT}`,
      {
        id_token: tokenId,
      }
    );
  
    // TODO handle response
    setError(response.error);
    setGoogleLoading(false);
  };
  
  const handleGoogleFailure = (res) => {
    const errorMessage = res.error === 'popup_closed_by_user'
      ? '' : `Error logging in with Google: ${res.error}`;

    if (!res.error.includes('idpiframe')) {
      setError(errorMessage);
    }
  };
  
  return (
    <>
      {error === '' ? null : <Error>{error}</Error>}
      <FacebookLogin
        appId={`${FACEBOOK_APP_ID}`}
        isMobile={false}
        fields="name,email,picture"
        callback={handleFacebookLogin}
        render={(renderProps) => (
          <FacebookButton
            onClick={renderProps.onClick}
            isLoading={renderProps.isProcessing}
          >
            <FacebookIcon>
              <FontAwesomeIcon icon={faFacebookSquare} />
            </FacebookIcon>
            <ButtonText>Continue with Facebook</ButtonText>
          </FacebookButton>
        )}
      />
      <GoogleLogin
        clientId={`${GOOGLE_APP_ID}.apps.googleusercontent.com`}
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        render={(renderProps) => (
          <GoogleButton
            onClick={renderProps.onClick}
            isLoading={googleLoading}
          >
            <GoogleIcon>
              <FontAwesomeIcon icon={faGoogle} />
            </GoogleIcon>
            <ButtonText>Continue with Google</ButtonText>
          </GoogleButton>
        )}
      />
    </>
  );
}

export default SocialLoginContent;