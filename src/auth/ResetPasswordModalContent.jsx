import React, { useState } from 'react';

/* Child Components */
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

const ResetPasswordForm = ({
  onSubmit,
  loading,
  error,
  success,
  emailError,
  setEmailError,
  successAwaitContinue,
  onContinue,
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
          disabled={successAwaitContinue}
        />
      </TextboxWrapper>
      <Button
        loading={loading}
        width="100%"
        type="submit"
        handleClick={event =>
          successAwaitContinue ? onContinue() : onSubmit(event, email)
        }
      >
        {successAwaitContinue ? 'Continue' : 'Send Reset Email'}
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
  successAwaitContinue,
  onContinue,
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
          disabled={successAwaitContinue}
        />
        <GreyLink onClick={(false, resendEmail)}>Send me a new code</GreyLink>
      </TextboxWrapper>
      <Button
        loading={loading}
        width="100%"
        handleClick={event =>
          successAwaitContinue ? onContinue() : onSubmit(event, code)
        }
      >
        {successAwaitContinue ? 'Continue' : 'Submit'}
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
  successAwaitContinue,
  onContinue,
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
          disabled={successAwaitContinue}
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
          disabled={successAwaitContinue}
        />
      </TextboxWrapper>
      <Button
        loading={loading}
        width="100%"
        handleClick={event =>
          successAwaitContinue
            ? onContinue()
            : onSubmit(event, pass, confirmPass)
        }
      >
        {successAwaitContinue ? 'Done' : 'Reset Password'}
      </Button>
    </FormWrapper>
  );
};

const RESET_PASSWORD_FORM = 'RESET_PASSWORD';
const ENTER_RESET_CODE_FORM = 'RESET_CODE';
const ENTER_NEW_PASSWORD_FORM = 'NEW_PASSWORD';

const ResetPasswordModalContent = ({ handleClose }) => {
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
  const [successAwaitContinue, setSuccessAwaitContinue] = useState(false);

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
      setSuccessAwaitContinue(true);
    }
  };

  const handleSubmitResetCode = async (event, code) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const [
      response,
      status,
    ] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${RESET_PASSWORD_VERIFY_KEY_ENDPOINT}`,
      { key: code },
    );
    setIsLoading(false);
    if (status >= 400) {
      setErrorMessage(RESET_PASSWORD_ERRORS[response.error] || DEFAULT_ERROR);
      setCodeError(true);
    } else {
      setSavedCode(code);
      setSuccessMessage('Code is valid!');
      setSuccessAwaitContinue(true);
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
      setSuccessAwaitContinue(true);
    }
  };

  if (showingForm === RESET_PASSWORD_FORM)
    return (
      <ResetPasswordForm
        onSubmit={handleSendResetEmail}
        loading={isLoading}
        error={errorMessage}
        success={successMessage}
        emailError={emailError}
        setEmailError={setEmailError}
        successAwaitContinue={successAwaitContinue}
        onContinue={() => {
          setShowingForm(ENTER_RESET_CODE_FORM);
          setSuccessAwaitContinue(false);
          setSuccessMessage('');
        }}
      />
    );
  if (showingForm === ENTER_RESET_CODE_FORM)
    return (
      <EnterResetCodeForm
        onSubmit={handleSubmitResetCode}
        loading={isLoading}
        error={errorMessage}
        resendEmail={() => handleSendResetEmail(email)}
        success={successMessage}
        codeError={codeError}
        setCodeError={setCodeError}
        successAwaitContinue={successAwaitContinue}
        onContinue={() => {
          setShowingForm(ENTER_NEW_PASSWORD_FORM);
          setSuccessAwaitContinue(false);
          setSuccessMessage('');
        }}
      />
    );

  if (showingForm === ENTER_NEW_PASSWORD_FORM)
    return (
      <EnterNewPasswordForm
        onSubmit={handleNewPassword}
        loading={isLoading}
        error={errorMessage}
        success={successMessage}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        confirmPasswordError={confirmPasswordError}
        setConfirmPasswordError={setConfirmPasswordError}
        successAwaitContinue={successAwaitContinue}
        onContinue={() => {
          setSuccessAwaitContinue(false);
          setSuccessMessage('');
          handleClose();
        }}
      />
    );
};

export default ResetPasswordModalContent;
