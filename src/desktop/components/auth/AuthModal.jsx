import React, { useState } from 'react';

/* Child Components */
import LoginContent from './LoginContent';
import ModalHOC from '../common/modal/ModalHOC';
import SignupContent from './SignupContent';

export const AuthForm = () => {
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
      formState={formState}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  ) : (
    <SignupContent
      onSwitchModal={() => setShowLoginForm(true)}
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
    <AuthForm />
  </ModalHOC>
);

export default AuthModal;
