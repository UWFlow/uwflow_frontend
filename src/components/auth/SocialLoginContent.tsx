import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGoogleLogin } from '@react-oauth/google';

import {
  BACKEND_ENDPOINT,
  FACEBOOK_APP_ID,
  FACEBOOK_AUTH_ENDPOINT,
  GOOGLE_AUTH_ENDPOINT,
} from 'constants/Api';
import { AUTH_ERRORS } from 'constants/Messages';
import { AuthResponse, ErrorResponse, FbAuthResponse } from 'types/Api';
import { makePOSTRequest } from 'utils/Api';

import {
  ButtonText,
  Error,
  FacebookButton,
  FacebookIcon,
  GoogleButton,
  GoogleIcon,
} from './styles/AuthForm';

type SocialLoginContentProps = {
  onAuthSuccess: (res: AuthResponse) => void;
};

const SocialLoginContent = ({ onAuthSuccess }: SocialLoginContentProps) => {
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleFacebookLogin = async (res: FbAuthResponse) => {
    if (!res.accessToken) {
      setError(AUTH_ERRORS.no_facebook_email);
      return;
    }

    const { accessToken } = res;
    const [response, status] = await makePOSTRequest<
      object,
      AuthResponse | ErrorResponse
    >(`${BACKEND_ENDPOINT}${FACEBOOK_AUTH_ENDPOINT}`, {
      access_token: accessToken,
    });

    if (status >= 400) {
      const errorRes = response as ErrorResponse;
      setError(AUTH_ERRORS[errorRes.error] || AUTH_ERRORS.no_facebook_email);
    } else {
      onAuthSuccess(response as AuthResponse);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    // Backend reads the user's email from this access token, so request those scopes.
    scope: 'email profile',
    onSuccess: async ({ access_token }) => {
      setGoogleLoading(true);
      const [response, status] = await makePOSTRequest<
        object,
        AuthResponse | ErrorResponse
      >(`${BACKEND_ENDPOINT}${GOOGLE_AUTH_ENDPOINT}`, {
        access_token,
      });

      setGoogleLoading(false);
      if (status >= 400) {
        const errorRes = response as ErrorResponse;
        setError(AUTH_ERRORS[errorRes.error] || AUTH_ERRORS.no_google_email);
      } else {
        onAuthSuccess(response as AuthResponse);
      }
    },
    onError: () => setError(AUTH_ERRORS.no_google_email),
    // Fires when the user closes/blocks the popup — not a real failure, so stay quiet.
    onNonOAuthError: () => {},
  });

  return (
    <>
      {error && <Error>{error}</Error>}
      <FacebookLogin
        appId={`${FACEBOOK_APP_ID}`}
        isMobile={false}
        fields="name,email,picture"
        callback={handleFacebookLogin}
        render={(renderProps: any) => (
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
      <GoogleButton
        onClick={() => handleGoogleLogin()}
        onMouseDown={(e) => e.preventDefault()}
        isLoading={googleLoading}
      >
        <GoogleIcon>
          <FontAwesomeIcon icon={faGoogle} />
        </GoogleIcon>
        <ButtonText>Continue with Google</ButtonText>
      </GoogleButton>
    </>
  );
};

export default SocialLoginContent;
