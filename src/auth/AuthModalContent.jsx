import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { WELCOME_PAGE_ROUTE } from 'Routes';

import AuthForm from './AuthForm';

const AuthModalContent = ({
  onAfterLogin,
  onAfterSignup,
  onRequestClose,
  history,
}) => {
  if (!onAfterSignup) {
    onAfterSignup = () =>
      history.push(WELCOME_PAGE_ROUTE, {
        prevPath: `${history.location.pathname}?${history.location.search}`,
      });
  }
  return (
    <AuthForm
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

AuthModalContent.propTypes = {
  onAfterLogin: PropTypes.func,
  onAfterSignup: PropTypes.func,
  onRequestClose: PropTypes.func,
};

export default withRouter(AuthModalContent);
