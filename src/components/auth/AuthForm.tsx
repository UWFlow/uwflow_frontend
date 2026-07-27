import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getRoutePattern, PRIVACY_PAGE_ROUTE } from 'Routes';

import { AuthSource } from 'constants/Analytics';
import { AUTH_ERRORS, AUTH_SUCCESS, DEFAULT_ERROR } from 'constants/Messages';
import { RESET_PASSWORD_MODAL } from 'constants/Modal';
import { LOGGED_IN } from 'data/actions/AuthActions';
import useModal from 'hooks/useModal';
import { capture, identify } from 'lib/analytics';
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

export type AuthMethod = 'email' | 'google' | 'facebook';

type AuthFormProps = {
  onLoginComplete: () => void;
  onSignupComplete: () => void;
  /** Which piece of UI opened this form — becomes the analytics attribution. */
  source: AuthSource;
  margin?: string;
  closeAuthModal?: () => void;
};

const AuthForm = ({
  onLoginComplete,
  onSignupComplete,
  source,
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

  // Snapshot where the user was when the form appeared. This must be read at
  // mount, not at capture time: a successful signup redirects to /welcome
  // before the deferred analytics call runs, so reading location later would
  // report /welcome as the origin of every single signup.
  const entry = useRef({
    source,
    signup_page: getRoutePattern(window.location.pathname),
    signup_path: window.location.pathname,
    signup_referrer: document.referrer || null,
  });

  // Denominator for the funnel: without it we'd know where signups come from
  // but not which prompts actually convert.
  useEffect(() => {
    capture('auth_prompt_shown', entry.current);
  }, []);

  const setJWT = (response: AuthResponse) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user_id', response.user_id);
  };

  const onAuthSuccess = (response: AuthResponse, method: AuthMethod) => {
    setJWT(response);
    dispatch({ type: LOGGED_IN });
    if (response.is_new) {
      toast(AUTH_SUCCESS.signup);
      onSignupComplete();
    } else {
      toast(AUTH_SUCCESS.login);
      onLoginComplete();
    }
    // Analytics on the side — identify/capture defer themselves, so the login
    // toast and redirect above run first and are never blocked.
    identify(
      response.user_id,
      undefined,
      response.is_new
        ? {
            initial_signup_method: method,
            initial_signup_source: entry.current.source,
            initial_signup_page: entry.current.signup_page,
          }
        : undefined,
    );
    if (response.is_new) {
      capture('account_created', { method, ...entry.current });
    }
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
      setErrorMessage(AUTH_ERRORS[errorRes.error] || DEFAULT_ERROR);
    } else {
      onAuthSuccess(response as AuthResponse, 'email');
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
            <PrivacyPolicyText to={PRIVACY_PAGE_ROUTE} onClick={closeAuthModal}>
              Privacy Policy
            </PrivacyPolicyText>
          </PrivacyWrapper>
        </ContentWrapper>
        <SwapModalWrapper>
          New to UW Flow?
          <SwapModalLink
            onClick={() => {
              // The form opens on login, so switching to signup is the clearest
              // signal of signup intent we get before the account exists.
              if (showLoginForm) {
                capture('signup_form_opened', entry.current);
              }
              setShowLoginForm(!showLoginForm);
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {showLoginForm ? 'Sign up' : 'Log in'}
          </SwapModalLink>
        </SwapModalWrapper>
      </Wrapper>
    </>
  );
};

export default AuthForm;
