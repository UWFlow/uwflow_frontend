import React, { useState } from 'react';

/* Child Components */
import ModalHOC from '../sharedComponents/modal/ModalHOC';
import Textbox from '../sharedComponents/input/Textbox';
import Button from '../sharedComponents/input/Button';

/* Utils */
import { makePOSTRequest } from '../utils/Api';

/* Constants */
import {
  BACKEND_ENDPOINT,
  RESET_PASSWORD_KEY_EMAIL_ENDPOINT,
  RESET_PASSWORD_VERIFY_KEY_ENDPOINT,
  RESET_PASSWORD_RESET_PASSWORD_ENDPOINT,
} from '../constants/Api';

/* Styled Components */
import { Wrapper, Header, Form, Error } from './styles/ResetPasswordModal';
import { TextboxWrapper } from './styles/ResetPasswordModal';

const ResetPasswordForm = ({ onSubmit, error }) => {
  const [email, setEmail] = useState('');
  return (
    <Wrapper>
      <Header>Reset Password</Header>
      {error !== '' && <Error>{error}</Error>}
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%', type: 'email' }}
          placeholder="Email address"
          error={false}
          text={email}
          setText={value => {
            setEmail(value);
          }}
        />
      </TextboxWrapper>
      <Button width="100%" handleClick={() => onSubmit(email)}>
        Send Reset Email
      </Button>
    </Wrapper>
  );
};

const EnterResetCodeForm = ({ onSubmit, error }) => {
  const [code, setCode] = useState('');
  return (
    <Wrapper>
      <Header>Enter reset code</Header>
      {error !== '' && <Error>{error}</Error>}
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%' }}
          placeholder="Code"
          error={false}
          text={code}
          setText={value => {
            setCode(value);
          }}
        />
      </TextboxWrapper>
      <Button width="100%" handleClick={() => onSubmit(code)}>
        Submit
      </Button>
    </Wrapper>
  );
};

const EnterNewPasswordForm = ({ onSubmit, error }) => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  return (
    <Wrapper>
      <Header>Enter new password</Header>
      {error !== '' && <Error>{error}</Error>}
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%' }}
          placeholder="New password"
          error={false}
          text={pass}
          setText={value => {
            setPass(value);
          }}
        />
      </TextboxWrapper>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%' }}
          placeholder="Confirm new password"
          error={false}
          text={confirmPass}
          setText={value => {
            setConfirmPass(value);
          }}
        />
      </TextboxWrapper>
      <Button width="100%" handleClick={() => onSubmit(pass, confirmPass)}>
        Send Reset Email
      </Button>
    </Wrapper>
  );
};

const RESET_PASSWORD_FORM = 'RESET_PASSWORD';
const ENTER_RESET_CODE_FORM = 'RESET_CODE';
const ENTER_NEW_PASSWORD_FORM = 'NEW_PASSWORD';

const ResetPasswordModal = ({ handleClose, isOpen }) => {
  const [showingForm, setShowingForm] = useState(RESET_PASSWORD_FORM);
  const [savedCode, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetEmail = async email => {
    setIsLoading(true);
    setErrorMessage('');
    const [response, status] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${RESET_PASSWORD_KEY_EMAIL_ENDPOINT}`,
      { email: email },
    );
    setIsLoading(false);
    if (status >= 400) {
      // ERROR
      setErrorMessage(response.error);
    } else {
      // SUCCESS
      setShowingForm(ENTER_RESET_CODE_FORM);
    }
  };

  const handleSubmitResetCode = async code => {
    setIsLoading(true);
    setErrorMessage('');
    const [response, status] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${RESET_PASSWORD_VERIFY_KEY_ENDPOINT}`,
      { key: code },
    );
    setIsLoading(false);
    if (status >= 400) {
      // ERROR
      setErrorMessage(response.error);
    } else {
      // SUCCESS
      setCode(code);
      setShowingForm(ENTER_NEW_PASSWORD_FORM);
    }
  };

  const handleNewPassword = async (newPass, confirmNewPass) => {
    if (newPass !== confirmNewPass) {
      setErrorMessage("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    const [response, status] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${RESET_PASSWORD_RESET_PASSWORD_ENDPOINT}`,
      { key: savedCode, password: newPass },
    );
    setIsLoading(false);
    if (status >= 400) {
      // ERROR
      setErrorMessage(response.error);
    } else {
      // SUCCESS
      handleClose();
    }
  };

  return (
    <ModalHOC isModalOpen={isOpen} onCloseModal={handleClose}>
      {showingForm === RESET_PASSWORD_FORM && (
        <ResetPasswordForm
          onSubmit={handleSendResetEmail}
          error={errorMessage}
        />
      )}
      {showingForm === ENTER_RESET_CODE_FORM && (
        <EnterResetCodeForm
          onSubmit={handleSubmitResetCode}
          error={errorMessage}
        />
      )}
      {showingForm === ENTER_NEW_PASSWORD_FORM && (
        <EnterNewPasswordForm
          onSubmit={handleNewPassword}
          error={errorMessage}
        />
      )}
    </ModalHOC>
  );
};

export default ResetPasswordModal;
