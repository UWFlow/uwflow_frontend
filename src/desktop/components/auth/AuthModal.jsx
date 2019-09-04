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

const AuthModal = ({ isModalOpen, onCloseModal }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <ModalHOC isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
      {showLoginModal && (
        <LoginContent onSwitchModal={() => setShowLoginModal(false)} />
      )}
      {!showLoginModal && (
        <SignupContent onSwitchModal={() => setShowLoginModal(true)} />
      )}
    </ModalHOC>
  );
};

export default AuthModal;
