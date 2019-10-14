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
} from './styles/AuthForm';

/* Child Components */
import Textbox from '../basicComponents/Textbox';
import Button from '../basicComponents/Button';

import { validateEmail } from '../utils/Email';
import { BACKEND_ENDPOINT, EMAIL_AUTH_LOGIN_ENDPOINT } from '../constants/Api';

const LoginContent = ({ handleAuth, formState, setEmail, setPassword }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);

  const validateFields = () => {
    const emailValid = validateEmail(formState.email);
    setEmailError(!emailValid);
    return emailValid;
  };

  const handleLogin = async event => {
    handleAuth(
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
        <Error>{errorMessage}</Error>
        <TextboxWrapper>
          <Textbox
            options={{ width: '100%', type: 'email' }}
            placeholder="Email address"
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
            text={formState.password}
            setText={setPassword}
          />
        </TextboxWrapper>
        <ForgotPasswordWrapper>
          <ForgotPasswordText>Forgot password?</ForgotPasswordText>
        </ForgotPasswordWrapper>
        <Button margin="0 0 16px 0" width="100%" onClick={handleLogin}>
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