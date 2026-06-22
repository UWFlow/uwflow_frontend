import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/input/Button';
import Textbox from 'components/input/Textbox';
import {
  BACKEND_ENDPOINT,
  EMAIL_VERIFY_ENDPOINT,
  EMAIL_VERIFY_SEND_ENDPOINT,
} from 'constants/Api';
import { AUTH_ERRORS, AUTH_SUCCESS, DEFAULT_ERROR } from 'constants/Messages';
import {
  AuthResponse,
  EmailVerifyBody,
  EmailVerifySendBody,
  ErrorResponse,
} from 'types/Api';
import { makePOSTRequest } from 'utils/Api';

import { Error, Form, Header, TextboxWrapper } from './styles/AuthForm';
import { GreyLink, Text } from './styles/ResetPasswordModal';

type VerifyEmailContentProps = {
  email: string;
  onVerified: (response: AuthResponse) => void;
  // When reaching this step from a login attempt no code has been sent yet, so
  // request one on mount. After signup the register call already queued a code.
  sendOnMount?: boolean;
};

const VerifyEmailContent = ({
  email,
  onVerified,
  sendOnMount = false,
}: VerifyEmailContentProps) => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendCode = useCallback(async () => {
    const [response, status] = await makePOSTRequest<
      EmailVerifySendBody,
      ErrorResponse | object
    >(`${BACKEND_ENDPOINT}${EMAIL_VERIFY_SEND_ENDPOINT}`, { email });

    if (status >= 400) {
      const errorRes = response as ErrorResponse;
      setErrorMessage(AUTH_ERRORS[errorRes.error] || DEFAULT_ERROR);
    } else {
      toast(AUTH_SUCCESS.verificationSent);
    }
  }, [email]);

  useEffect(() => {
    if (sendOnMount) {
      sendCode();
    }
  }, [sendOnMount, sendCode]);

  const handleResend = async (event: SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setErrorMessage('');
    await sendCode();
  };

  const handleSubmit = async (event: SyntheticEvent<EventTarget>) => {
    event.preventDefault();

    if (code === '') {
      setCodeError(true);
      return;
    }

    setLoading(true);
    setErrorMessage('');
    const [response, status] = await makePOSTRequest<
      EmailVerifyBody,
      AuthResponse | ErrorResponse
    >(`${BACKEND_ENDPOINT}${EMAIL_VERIFY_ENDPOINT}`, { key: code });
    setLoading(false);

    if (status >= 400) {
      const errorRes = response as ErrorResponse;
      setErrorMessage(AUTH_ERRORS[errorRes.error] || DEFAULT_ERROR);
      setCodeError(true);
    } else {
      onVerified(response as AuthResponse);
    }
  };

  return (
    <>
      <Header>Verify your email</Header>
      <Text>
        We sent a verification code to {email}. Enter it below to finish setting
        up your account.
      </Text>
      <Form onSubmit={handleSubmit}>
        {errorMessage !== '' && <Error>{errorMessage}</Error>}
        <TextboxWrapper>
          <Textbox
            options={{ width: '100%', name: 'verification-code' }}
            placeholder="Verification code"
            error={codeError}
            text={code}
            setText={(value) => {
              setCode(value);
              setCodeError(false);
            }}
          />
          <GreyLink onClick={handleResend}>Send me a new code</GreyLink>
        </TextboxWrapper>
        <Button
          loading={loading}
          margin="0 0 16px 0"
          width="100%"
          handleClick={handleSubmit}
          type="submit"
        >
          Verify
        </Button>
      </Form>
    </>
  );
};

export default VerifyEmailContent;
