import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

/* Styled Components */
import {
  Error
} from './styles/AuthModal';

import { BACKEND_ENDPOINT, GOOGLE_AUTH_ENDPOINT, FACEBOOK_AUTH_ENDPOINT } from '../../../constants/Api';

const SocialLoginContent = ({}) => {
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

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

  const handleFacebookSuccess = async (res) => {
    const {tokenId, profileObj} = res;
    const {
      email, familyName, givenName, imageUrl
    } = profileObj;
  
    setGoogleLoading(true);
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
    setGoogleLoading(false);
  };
  
  const handleFacebookFailure = (res) => {
    const errorMessage = res.error === "popup_closed_by_user"
      ? '' : `Unexpected error logging in with Google: ${res.error}`;
    setError(errorMessage);
  };


  return (
    <>
      {error === '' ? null : <Error>{error}</Error>}
      <GoogleLogin />
      <FacebookLogin />
    </>
  );
}

export default SocialLoginContent;