import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  Wrapper,
  ContentWrapper,
  OrWrapper,
  PrivacyWrapper,
  PrivacyPolicyText,
  GreyText,
  SwapModalWrapper,
  SwapModalLink,
} from './styles/AuthForm';


/* Child Components */
import LoginContent from './LoginContent';
import SignupContent from './SignupContent';
import SocialLoginContent from './SocialLoginContent';

import { makePOSTRequest } from '../../../utils/Api';
import { PRIVACY_PAGE_ROUTE } from '../../../Routes';

export const AuthForm = ({ onAuthComplete = () => {} }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAuth = async (event, endpoint, data, setErrorMessage, validateFields) => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    const [response, status] = await makePOSTRequest(endpoint, data);

    if (status >= 400) {
      setErrorMessage(response.error);
    } else {
      localStorage.setItem('token', response);
      onAuthComplete();
    }
  }

  const formState = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  }

  return (
    <Wrapper>
      <ContentWrapper>
        {showLoginForm ? (
          <LoginContent
            onSwitchModal={() => setShowLoginForm(false)}
            handleAuth={handleAuth}
            formState={formState}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        ) : (
          <SignupContent
            onSwitchModal={() => setShowLoginForm(true)}
            handleAuth={handleAuth}
            formState={formState}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
        )}
        <OrWrapper>OR</OrWrapper>
        <SocialLoginContent />
        <PrivacyWrapper>
          <GreyText>Read our </GreyText>
          <PrivacyPolicyText to={PRIVACY_PAGE_ROUTE}>
            Privacy Policy
          </PrivacyPolicyText>
        </PrivacyWrapper>
      </ContentWrapper>
      <SwapModalWrapper>
        New to UW Flow?
        <SwapModalLink onClick={() => setShowLoginForm(!showLoginForm)}>
          {showLoginForm ? 'Sign up' : 'Log in'}
        </SwapModalLink>
      </SwapModalWrapper>
    </Wrapper>
  );
};

AuthForm.propTypes = {
  onAuthComplete: PropTypes.func
}

export default AuthForm;
