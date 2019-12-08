import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import ResetPasswordModal from './ResetPasswordModal';

import { PRIVACY_PAGE_ROUTE } from '../Routes';
import { makePOSTRequest } from '../utils/Api';
import { LOGGED_IN } from '../data/actions/AuthActions';

export const AuthForm = ({
  onLoginComplete = () => {},
  onSignupComplete = () => {},
}) => {
  const dispatch = useDispatch();

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);

  const setJWT = response => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user_id', response.user_id);
    dispatch({ type: LOGGED_IN });
    if (showLoginForm) {
      onLoginComplete();
    } else {
      onSignupComplete();
    }
  };

  const handleAuth = async (
    event,
    endpoint,
    data,
    setErrorMessage,
    validateFields,
  ) => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    const [response, status] = await makePOSTRequest(endpoint, data);

    if (status >= 400) {
      setErrorMessage(response.error);
    } else {
      setJWT(response);
    }
  };

  const formState = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  return (
    <>
      <Wrapper>
        <ContentWrapper>
          {showLoginForm ? (
            <LoginContent
              onSwitchModal={() => setShowLoginForm(false)}
              handleAuth={handleAuth}
              formState={formState}
              setEmail={setEmail}
              setPassword={setPassword}
              onShowResetPassword={() => setShowResetPassword(true)}
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
          <SocialLoginContent setJWT={setJWT} />
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
      <ResetPasswordModal
        handleClose={() => setShowResetPassword(false)}
        isOpen={showResetPassword}
      />
    </>
  );
};

AuthForm.propTypes = {
  onLoginComplete: PropTypes.func,
  onSignupComplete: PropTypes.func,
};

export default AuthForm;
