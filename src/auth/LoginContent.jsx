import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  Header,
  ForgotPasswordWrapper,
  ForgotPasswordText,
  TextboxWrapper,
  Form,
  Error,
  FormError,
} from './styles/AuthForm';

/* Child Components */
import Textbox from '../components/input/Textbox';
import Button from '../components/input/Button';

import { validateEmail } from '../utils/Email';
import { BACKEND_ENDPOINT, EMAIL_AUTH_LOGIN_ENDPOINT } from '../constants/Api';
import { AUTH_FORM_ERRORS } from '../constants/Messages';

const LoginContent = ({
  handleAuth,
  formState,
  setEmail,
  setPassword,
  onShowResetPassword,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateFields = () => {
    const emailValid = validateEmail(formState.email);
    setEmailError(!emailValid);
    setPasswordError(formState.password === '');
    return emailValid && formState.password !== '';
  };

  const handleLogin = async event => {
    await handleAuth(
      event,
      `${BACKEND_ENDPOINT}${EMAIL_AUTH_LOGIN_ENDPOINT}`,
      {
        email: formState.email,
        password: formState.password,
      },
      setErrorMessage,
      validateFields,
    );
  };

  return (
    <>
      <Header>Log in</Header>
      <Form onSubmit={handleLogin}>
        {emailError && <FormError>{AUTH_FORM_ERRORS.invalid_email}</FormError>}
        {passwordError && (
          <FormError>{AUTH_FORM_ERRORS.empty_password}</FormError>
        )}
        {errorMessage && <Error>{errorMessage}</Error>}
        <TextboxWrapper>
          <Textbox
            options={{ width: '100%', type: 'email' }}
            placeholder="Email"
            error={emailError}
            text={formState.email}
            setText={value => {
              setEmail(value);
              setEmailError(false);
            }}
          />
        </TextboxWrapper>
        <TextboxWrapper>
          <Textbox
            options={{ width: '100%', type: 'password' }}
            placeholder="Password"
            error={passwordError}
            text={formState.password}
            setText={value => {
              setPassword(value);
              setPasswordError(false);
            }}
          />
        </TextboxWrapper>
        <ForgotPasswordWrapper>
          <ForgotPasswordText onClick={onShowResetPassword}>
            Forgot password?
          </ForgotPasswordText>
        </ForgotPasswordWrapper>
        <Button
          margin="0 0 16px 0"
          width="100%"
          onClick={handleLogin}
          type="submit"
        >
          Log in
        </Button>
      </Form>
    </>
  );
};

LoginContent.propTypes = {
  handleAuth: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginContent;
