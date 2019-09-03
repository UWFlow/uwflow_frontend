import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import LoginContent from './LoginContent';
import ModalHOC from '../common/modal/ModalHOC';
import SignupContent from './SignupContent';

export const AuthForm = ({ onCloseModal }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const formState = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  }

  return showLoginForm ? (
    <LoginContent
      onSwitchModal={() => setShowLoginForm(false)}
      onCloseModal={onCloseModal}
      formState={formState}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  ) : (
    <SignupContent
      onSwitchModal={() => setShowLoginForm(true)}
      onCloseModal={onCloseModal}
      formState={formState}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
    />
  );
};

const AuthModal = ({ isModalOpen, onCloseModal }) => (
  <ModalHOC isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
    <AuthForm onCloseModal={onCloseModal} />
  </ModalHOC>
);

AuthModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired
}

export default AuthModal;
