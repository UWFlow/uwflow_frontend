import React, { useState } from 'react';

/* Child Components */
import LoginContent from './LoginContent';
import ModalHOC from '../common/modal/ModalHOC';
import SignupContent from './SignupContent';

export const EMAIL_TEXTBOX_ID = 'EmailAddress';
export const PASSWORD_TEXTBOX_ID = 'Password';
export const FIRST_NAME_TEXTBOX_ID = 'FirstName';
export const LAST_NAME_TEXTBOX_ID = 'LastName';
export const CONFIRM_PASSWORD_TEXTBOX_ID = 'ConfirmPassword';

export const AuthForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  return showLoginForm ? (
    <LoginContent onSwitchModal={() => setShowLoginForm(false)} />
  ) : (
    <SignupContent onSwitchModal={() => setShowLoginForm(true)} />
  );
};

const AuthModal = ({ isModalOpen, onCloseModal }) => (
  <ModalHOC isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
    <AuthForm />
  </ModalHOC>
);

export default AuthModal;
