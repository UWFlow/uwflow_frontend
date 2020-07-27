import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  BACKEND_ENDPOINT,
  FACEBOOK_APP_ID,
  FACEBOOK_AUTH_ENDPOINT,
  GOOGLE_APP_ID,
  GOOGLE_AUTH_ENDPOINT,
} from 'constants/Api';
import { AUTH_ERRORS } from 'constants/Messages';
import { makePOSTRequest } from 'utils/Api';

import {
  ButtonText,
  Error,
  FacebookButton,
  FacebookIcon,
  GoogleButton,
  GoogleIcon,
} from './styles/AuthForm';

const SocialLoginContent = ({ onAuthSuccess }) => {
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleFacebookLogin = async (res) => {
    if (!res.accessToken) {
      setError(AUTH_ERRORS.no_facebook_email);
      return;
    }

    const { accessToken } = res;

    const [response, status] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${FACEBOOK_AUTH_ENDPOINT}`,
      {
        access_token: accessToken,
      },
    );

    if (status >= 400) {
      setError(AUTH_ERRORS[response.error] || AUTH_ERRORS.no_facebook_email);
    } else {
      onAuthSuccess(response);
    }
  };

  const handleGoogleSuccess = async (res) => {
    const { accessToken } = res;

    setGoogleLoading(true);

    const [response, status] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${GOOGLE_AUTH_ENDPOINT}`,
      {
        access_token: accessToken,
      },
    );
    setGoogleLoading(false);
    if (status >= 400) {
      setError(AUTH_ERRORS[response.error] || AUTH_ERRORS.no_google_email);
    } else {
      onAuthSuccess(response);
    }
  };

  const handleGoogleFailure = (res) => {
    const errorMessage =
      res.error === 'popup_closed_by_user' ? '' : AUTH_ERRORS.no_google_email;

    if (!res.error.includes('idpiframe')) {
      setError(errorMessage);
    }
  };

  return (
    <>
      {error && <Error>{error}</Error>}
      <FacebookLogin
        appId={`${FACEBOOK_APP_ID}`}
        isMobile={false}
        fields="name,email,picture"
        callback={handleFacebookLogin}
        render={(renderProps) => (
          <FacebookButton
            onClick={renderProps.onClick}
            onMouseDown={(e) => e.preventDefault()}
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
            onMouseDown={(e) => e.preventDefault()}
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
};

export default SocialLoginContent;
