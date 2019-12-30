import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/* Child Components */
import AuthForm from './AuthForm';

/* Routes */
import { WELCOME_PAGE_ROUTE } from '../Routes';

export const AUTH_MODAL_CONTENT = 'AUTH_MODAL_CONTENT';

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
    />
  );
};

AuthModalContent.propTypes = {
  onAfterLogin: PropTypes.func,
  onAfterSignup: PropTypes.func,
  onRequestClose: PropTypes.func,
};

export default withRouter(AuthModalContent);
