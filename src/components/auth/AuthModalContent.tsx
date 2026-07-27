import React from 'react';
import { useHistory } from 'react-router-dom';
import { WELCOME_PAGE_ROUTE } from 'Routes';

import { AuthSource } from 'constants/Analytics';

import AuthForm from './AuthForm';

export type AuthModalContentProps = {
  onAfterLogin: () => void;
  onAfterSignup: () => void;
  onRequestClose: () => void;
  /** Which piece of UI opened the modal — see `AUTH_SOURCES`. */
  source: AuthSource;
};

const AuthModalContent = ({
  onAfterLogin,
  onAfterSignup,
  onRequestClose,
  source,
}: AuthModalContentProps) => {
  const history = useHistory();

  if (!onAfterSignup) {
    onAfterSignup = () =>
      history.push(WELCOME_PAGE_ROUTE, {
        prevPath: `${history.location.pathname}?${history.location.search}`,
      });
  }
  return (
    <AuthForm
      source={source}
      onLoginComplete={() => {
        onRequestClose();
        if (onAfterLogin) {
          onAfterLogin();
        }
      }}
      onSignupComplete={() => {
        onRequestClose();
        onAfterSignup();
      }}
      margin="0"
      closeAuthModal={onRequestClose}
    />
  );
};

export default AuthModalContent;
