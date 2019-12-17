import React, { useState } from 'react';

/* Child Components */
import Modal from '../components/display/Modal';
import Textbox from '../components/input/Textbox';
import Button from '../components/input/Button';

/* Utils */
import { makePOSTRequest } from '../utils/Api';

/* Constants */
import {
  BACKEND_ENDPOINT,
  RESET_PASSWORD_KEY_EMAIL_ENDPOINT,
  RESET_PASSWORD_VERIFY_KEY_ENDPOINT,
  RESET_PASSWORD_RESET_PASSWORD_ENDPOINT,
} from '../constants/Api';
import { MIN_PASSWORD_LENGTH } from '../constants/Auth';
import { RESET_PASSWORD_ERRORS, DEFAULT_ERROR } from '../constants/Messages';

/* Styled Components */
import {
  FormWrapper,
  Header,
  Text,
  Error,
  Success,
  TextboxWrapper,
  GreyLink,
} from './styles/ResetPasswordModal';
import { validateEmail } from '../utils/Email';
import { sleep } from '../utils/Misc';

const ResetPasswordForm = ({
  onSubmit,
  loading,
  error,
  success,
  emailError,
  setEmailError,
}) => {
  const [email, setEmail] = useState('');

  return (
    <FormWrapper onSubmit={event => onSubmit(event, email)}>
      <Header>Reset Password</Header>
      {error !== '' && <Error>{error}</Error>}
      {success !== '' && <Success>{success}</Success>}
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%', type: 'email' }}
          placeholder="Email"
          error={emailError}
          text={email}
          setText={value => {
            setEmail(value);
            setEmailError(false);
          }}
        />
      </TextboxWrapper>
      <Button
        loading={loading}
        width="100%"
        handleClick={event => onSubmit(event, email)}
      >
        Send Reset Email
      </Button>
    </FormWrapper>
  );
};

const EnterResetCodeForm = ({
  onSubmit,
  loading,
  error,
  resendEmail,
  success,
  codeError,
  setCodeError,
}) => {
  const [code, setCode] = useState('');
  return (
    <FormWrapper onSubmit={event => onSubmit(event, code)}>
      <Header>Enter reset code</Header>
      <Text>
        We just sent you an email with a reset code, please enter it below:
      </Text>
      {error !== '' && <Error>{error}</Error>}
      {success !== '' && <Success>{success}</Success>}
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%' }}
          placeholder="Code"
          error={codeError}
          text={code}
          setText={value => {
            setCode(value);
            setCodeError(false);
          }}
        />
        <GreyLink onClick={(false, resendEmail)}>Send me a new code</GreyLink>
      </TextboxWrapper>
      <Button
        loading={loading}
        width="100%"
        handleClick={event => onSubmit(event, code)}
      >
        Submit
      </Button>
    </FormWrapper>
  );
};

const EnterNewPasswordForm = ({
  onSubmit,
  loading,
  error,
  success,
  passwordError,
  setPasswordError,
  confirmPasswordError,
  setConfirmPasswordError,
}) => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <FormWrapper onSubmit={event => onSubmit(event, pass, confirmPass)}>
      <Header>Enter new password</Header>
      {error !== '' && <Error>{error}</Error>}
      {success !== '' && <Success>{success}</Success>}
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%', type: 'password' }}
          placeholder="New password"
          error={passwordError}
          text={pass}
          setText={value => {
            setPass(value);
            setPasswordError(false);
          }}
        />
      </TextboxWrapper>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%', type: 'password' }}
          placeholder="Confirm new password"
          error={confirmPasswordError}
          text={confirmPass}
          setText={value => {
            setConfirmPass(value);
            setConfirmPasswordError(false);
          }}
        />
      </TextboxWrapper>
      <Button
        loading={loading}
        width="100%"
        handleClick={event => onSubmit(event, pass, confirmPass)}
      >
        Reset Password
      </Button>
    </FormWrapper>
  );
};

const RESET_PASSWORD_FORM = 'RESET_PASSWORD';
const ENTER_RESET_CODE_FORM = 'RESET_CODE';
const ENTER_NEW_PASSWORD_FORM = 'NEW_PASSWORD';
const TIMEOUT_LENGTH = 800;

const ResetPasswordModal = ({ handleClose, isOpen }) => {
  const [showingForm, setShowingForm] = useState(RESET_PASSWORD_FORM);
  const [savedCode, setSavedCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleSendResetEmail = async (event, email) => {
    if (event) {
      event.preventDefault();
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      setErrorMessage('Please enter a valid email.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const [
      response,
      status,
    ] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${RESET_PASSWORD_KEY_EMAIL_ENDPOINT}`,
      { email: email },
    );
    setIsLoading(false);
    if (status >= 400) {
      setErrorMessage(RESET_PASSWORD_ERRORS[response.error] || DEFAULT_ERROR);
    } else {
      setEmail(email);
      setSuccessMessage('Successfully sent reset code!');
      if (showingForm !== ENTER_RESET_CODE_FORM) {
        await sleep(TIMEOUT_LENGTH);
        setSuccessMessage('');
        setShowingForm(ENTER_RESET_CODE_FORM);
      }
    }
  };

  const handleSubmitResetCode = async (event, code) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const [response, status] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${RESET_PASSWORD_VERIFY_KEY_ENDPOINT}?key=${code}`,
      {},
    );
    setIsLoading(false);
    if (status >= 400) {
      setErrorMessage(RESET_PASSWORD_ERRORS[response.error] || DEFAULT_ERROR);
      setCodeError(true);
    } else {
      setSavedCode(code);
      setSuccessMessage('Code is valid!');
      await sleep(TIMEOUT_LENGTH);
      setSuccessMessage('');
      setShowingForm(ENTER_NEW_PASSWORD_FORM);
    }
  };

  const handleNewPassword = async (event, newPass, confirmNewPass) => {
    event.preventDefault();

    if (newPass.length < MIN_PASSWORD_LENGTH) {
      setErrorMessage(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      );
      setPasswordError(true);
      return;
    }

    if (newPass !== confirmNewPass) {
      setErrorMessage("Passwords don't match.");
      setConfirmPasswordError(true);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const [
      response,
      status,
    ] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${RESET_PASSWORD_RESET_PASSWORD_ENDPOINT}`,
      { key: savedCode, password: newPass },
    );
    setIsLoading(false);
    if (status >= 400) {
      setErrorMessage(RESET_PASSWORD_ERRORS[response.error] || DEFAULT_ERROR);
    } else {
      setSuccessMessage('Password successfully reset!');
      await sleep(TIMEOUT_LENGTH);
      setSuccessMessage('');
      handleClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      {showingForm === RESET_PASSWORD_FORM && (
        <ResetPasswordForm
          onSubmit={handleSendResetEmail}
          loading={isLoading}
          error={errorMessage}
          success={successMessage}
          emailError={emailError}
          setEmailError={setEmailError}
        />
      )}
      {showingForm === ENTER_RESET_CODE_FORM && (
        <EnterResetCodeForm
          onSubmit={handleSubmitResetCode}
          loading={isLoading}
          error={errorMessage}
          resendEmail={() => handleSendResetEmail(email)}
          success={successMessage}
          codeError={codeError}
          setCodeError={setCodeError}
        />
      )}
      {showingForm === ENTER_NEW_PASSWORD_FORM && (
        <EnterNewPasswordForm
          onSubmit={handleNewPassword}
          loading={isLoading}
          error={errorMessage}
          success={successMessage}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
          confirmPasswordError={confirmPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
        />
      )}
    </Modal>
  );
};

export default ResetPasswordModal;
