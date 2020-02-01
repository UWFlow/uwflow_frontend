import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

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

import { PRIVACY_PAGE_ROUTE } from '../Routes';
import { makePOSTRequest } from '../utils/Api';
import { LOGGED_IN } from '../data/actions/AuthActions';
import {
  AUTH_ERRORS,
  DEFAULT_ERROR,
  AUTH_SUCCESS,
} from '../constants/Messages';
import withModal from '../components/modal/withModal';
import { RESET_PASSWORD_MODAL } from '../constants/Modal';

export const AuthForm = ({
  onLoginComplete,
  onSignupComplete,
  margin = '32px 0',
  closeAuthModal,
  openModal,
  closeModal,
}) => {
  const dispatch = useDispatch();

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const setJWT = response => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user_id', response.user_id);
  };

  const onAuthSuccess = response => {
    setJWT(response);
    dispatch({ type: LOGGED_IN });
    if (response.is_new) {
      toast(AUTH_SUCCESS.signup);
      onSignupComplete();
    } else {
      toast(AUTH_SUCCESS.login);
      onLoginComplete();
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
      setErrorMessage(AUTH_ERRORS[response.error] || DEFAULT_ERROR);
    } else {
      onAuthSuccess(response);
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
      <Wrapper margin={margin}>
        <ContentWrapper>
          {showLoginForm ? (
            <LoginContent
              onSwitchModal={() => setShowLoginForm(false)}
              handleAuth={handleAuth}
              formState={formState}
              setEmail={setEmail}
              setPassword={setPassword}
              onShowResetPassword={() =>
                openModal(RESET_PASSWORD_MODAL, {
                  handleClose: () => closeModal(RESET_PASSWORD_MODAL),
                })
              }
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
          <SocialLoginContent onAuthSuccess={onAuthSuccess} />
          <PrivacyWrapper>
            <GreyText>Read our </GreyText>
            <PrivacyPolicyText to={PRIVACY_PAGE_ROUTE} onClick={closeAuthModal}>
              Privacy Policy
            </PrivacyPolicyText>
          </PrivacyWrapper>
        </ContentWrapper>
        <SwapModalWrapper>
          New to UW Flow?
          <SwapModalLink
            onClick={() => setShowLoginForm(!showLoginForm)}
            onMouseDown={e => e.preventDefault()}
          >
            {showLoginForm ? 'Sign up' : 'Log in'}
          </SwapModalLink>
        </SwapModalWrapper>
      </Wrapper>
    </>
  );
};

export default withModal(AuthForm);
