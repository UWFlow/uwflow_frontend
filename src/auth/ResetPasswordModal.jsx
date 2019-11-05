import React, { useState } from 'react';

/* Child Components */
import ModalHOC from '../components/modal/ModalHOC';
import Textbox from '../components/input/Textbox';
import Button from '../components/input/Button';
import LoadingSpinner from '../components/display/LoadingSpinner';

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
import {
  Wrapper,
  Header,
  Text,
  Error,
  Success,
  TextboxWrapper,
  GreyLink,
  LoadingSpinnerWrapper,
} from './styles/ResetPasswordModal';

const ResetPasswordForm = ({ onSubmit, loading, error, success }) => {
  const [email, setEmail] = useState('');
  console.log(loading);
  return (
    <Wrapper>
      <Header>Reset Password</Header>
      {error !== '' && <Error>{error}</Error>}
      {success !== '' && <Success>{success}</Success>}
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
      {loading ? (
        <LoadingSpinnerWrapper>
          <LoadingSpinner size={24} margin="" />
        </LoadingSpinnerWrapper>
      ) : (
        <Button width="100%" handleClick={() => onSubmit(email)}>
          Send Reset Email
        </Button>
      )}
    </Wrapper>
  );
};

const EnterResetCodeForm = ({
  onSubmit,
  loading,
  error,
  resendEmail,
  success,
}) => {
  const [code, setCode] = useState('');
  return (
    <Wrapper>
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
          error={false}
          text={code}
          setText={value => {
            setCode(value);
          }}
        />
        <GreyLink onClick={resendEmail}>Resend email</GreyLink>
      </TextboxWrapper>
      {loading ? (
        <LoadingSpinnerWrapper>
          <LoadingSpinner size={24} margin="" />
        </LoadingSpinnerWrapper>
      ) : (
        <Button width="100%" handleClick={() => onSubmit(code)}>
          Submit
        </Button>
      )}
    </Wrapper>
  );
};

const EnterNewPasswordForm = ({ onSubmit, loading, error, success }) => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  return (
    <Wrapper>
      <Header>Enter new password</Header>
      {error !== '' && <Error>{error}</Error>}
      {success !== '' && <Success>{success}</Success>}
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%', type: 'password' }}
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
          options={{ width: '100%', type: 'password' }}
          placeholder="Confirm new password"
          error={false}
          text={confirmPass}
          setText={value => {
            setConfirmPass(value);
          }}
        />
      </TextboxWrapper>
      <Button width="100%" handleClick={() => onSubmit(pass, confirmPass)}>
        Reset Password
      </Button>
    </Wrapper>
  );
};

const RESET_PASSWORD_FORM = 'RESET_PASSWORD';
const ENTER_RESET_CODE_FORM = 'RESET_CODE';
const ENTER_NEW_PASSWORD_FORM = 'NEW_PASSWORD';
const TIMEOUT_LENGTH = 750;

const ResetPasswordModal = ({ handleClose, isOpen }) => {
  const [showingForm, setShowingForm] = useState(RESET_PASSWORD_FORM);
  const [savedCode, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSendResetEmail = async email => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
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
      setEmail(email);
      setSuccessMessage('Successfully sent reset code!');
      if (showingForm != ENTER_RESET_CODE_FORM) {
        setTimeout(() => {
          setSuccessMessage('');
          setShowingForm(ENTER_RESET_CODE_FORM);
        }, TIMEOUT_LENGTH);
      }
    }
  };

  const handleSubmitResetCode = async code => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const [response, status] = await makePOSTRequest(
      `${BACKEND_ENDPOINT}${RESET_PASSWORD_VERIFY_KEY_ENDPOINT}?key=${code}`,
      {},
    );
    setIsLoading(false);
    if (status >= 400) {
      // ERROR
      setErrorMessage(response.error);
    } else {
      // SUCCESS
      setCode(code);
      setSuccessMessage('Code is valid!');
      setTimeout(() => {
        setSuccessMessage('');
        setShowingForm(ENTER_NEW_PASSWORD_FORM);
      }, TIMEOUT_LENGTH);
    }
  };

  const handleNewPassword = async (newPass, confirmNewPass) => {
    if (newPass !== confirmNewPass) {
      setErrorMessage("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
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
      setSuccessMessage('Password successfully reset!');
      setTimeout(() => {
        setSuccessMessage('');
        handleClose();
      }, TIMEOUT_LENGTH);
    }
  };

  return (
    <ModalHOC isModalOpen={isOpen} onCloseModal={handleClose}>
      {showingForm === RESET_PASSWORD_FORM && (
        <ResetPasswordForm
          onSubmit={handleSendResetEmail}
          loading={isLoading}
          error={errorMessage}
          success={successMessage}
        />
      )}
      {showingForm === ENTER_RESET_CODE_FORM && (
        <EnterResetCodeForm
          onSubmit={handleSubmitResetCode}
          loading={isLoading}
          error={errorMessage}
          resendEmail={() => handleSendResetEmail(email)}
          success={successMessage}
        />
      )}
      {showingForm === ENTER_NEW_PASSWORD_FORM && (
        <EnterNewPasswordForm
          onSubmit={handleNewPassword}
          loading={isLoading}
          error={errorMessage}
          success={successMessage}
        />
      )}
    </ModalHOC>
  );
};

export default ResetPasswordModal;
