import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PRIVACY_PAGE_ROUTE } from 'Routes';

import { AUTH_ERRORS, AUTH_SUCCESS, DEFAULT_ERROR } from 'constants/Messages';
import { RESET_PASSWORD_MODAL } from 'constants/Modal';
import { LOGGED_IN } from 'data/actions/AuthActions';
import useModal from 'hooks/useModal';
import { AuthResponse, ErrorResponse } from 'types/Api';
import { makePOSTRequest } from 'utils/Api';

import {
  ContentWrapper,
  GreyText,
  OrWrapper,
  PrivacyPolicyText,
  PrivacyWrapper,
  SwapModalLink,
  SwapModalWrapper,
  Wrapper,
} from './styles/AuthForm';
import { AuthFormState, HandleAuthFunction } from './AuthTypes';
import LoginContent from './LoginContent';
import SignupContent from './SignupContent';
import SocialLoginContent from './SocialLoginContent';
import VerifyEmailContent from './VerifyEmailContent';

type AuthFormProps = {
  onLoginComplete: () => void;
  onSignupComplete: () => void;
  margin?: string;
  closeAuthModal?: () => void;
};

const AuthForm = ({
  onLoginComplete,
  onSignupComplete,
  margin = '32px 0',
  closeAuthModal,
}: AuthFormProps) => {
  const [openModal, closeModal] = useModal();
  const dispatch = useDispatch();

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Non-empty email puts the form into the "enter verification code" step.
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifySendOnMount, setVerifySendOnMount] = useState(false);

  const setJWT = (response: AuthResponse) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user_id', response.user_id);
  };

  const onAuthSuccess = (response: AuthResponse) => {
    // Email signups return no token: the account exists but isn't verified.
    // Switch to the verification step instead of logging the user in.
    if (response.is_new && !response.token) {
      setVerifySendOnMount(false);
      setVerifyEmail(email);
      return;
    }

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

  const onVerified = (response: AuthResponse) => {
    setVerifyEmail('');
    setJWT(response);
    dispatch({ type: LOGGED_IN });
    toast(AUTH_SUCCESS.signup);
    onSignupComplete();
  };

  const handleAuth: HandleAuthFunction = async <T extends object>(
    event: SyntheticEvent<EventTarget>,
    endpoint: string,
    data: T,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    validateFields: () => boolean,
  ): Promise<void> => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    const [response, status] = await makePOSTRequest<
      T,
      AuthResponse | ErrorResponse
    >(endpoint, data);

    if (status >= 400) {
      const errorRes = response as ErrorResponse;
      // Logging into an unverified account: jump to the code step and email a
      // fresh code, rather than showing a dead-end error.
      if (errorRes.error === 'email_not_verified') {
        setVerifySendOnMount(true);
        setVerifyEmail(email);
        return;
      }
      setErrorMessage(AUTH_ERRORS[errorRes.error] || DEFAULT_ERROR);
    } else {
      onAuthSuccess(response as AuthResponse);
    }
  };

  const formState: AuthFormState = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };

  return (
    <>
      <Wrapper margin={margin}>
        <ContentWrapper>
          {verifyEmail !== '' ? (
            <VerifyEmailContent
              email={verifyEmail}
              sendOnMount={verifySendOnMount}
              onVerified={onVerified}
            />
          ) : (
            <>
              {showLoginForm ? (
                <LoginContent
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
                <PrivacyPolicyText
                  to={PRIVACY_PAGE_ROUTE}
                  onClick={closeAuthModal}
                >
                  Privacy Policy
                </PrivacyPolicyText>
              </PrivacyWrapper>
            </>
          )}
        </ContentWrapper>
        {verifyEmail === '' && (
          <SwapModalWrapper>
            New to UW Flow?
            <SwapModalLink
              onClick={() => setShowLoginForm(!showLoginForm)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showLoginForm ? 'Sign up' : 'Log in'}
            </SwapModalLink>
          </SwapModalWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default AuthForm;
