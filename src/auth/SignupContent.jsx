import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  Header,
  NamesSection,
  Spacer,
  TextboxWrapper,
  Form,
  Error,
} from './styles/AuthForm';

/* Child Components */
import Textbox from '../sharedComponents/input/Textbox';
import Button from '../sharedComponents/input/Button';

import { validateEmail } from '../utils/Email';
import {
  BACKEND_ENDPOINT,
  EMAIL_AUTH_REGISTER_ENDPOINT,
} from '../constants/Api';

const MIN_PASSWORD_LENGTH = 6;

const SignupContent = ({
  handleAuth,
  formState,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const transformName = name => {
    return name[0].toUpperCase() + name.slice(1);
  };

  const validateFields = () => {
    setEmailError(!validateEmail(formState.email));
    setFirstNameError(formState.firstName === '');
    setLastNameError(formState.lastName === '');
    setPasswordError(formState.password.length < MIN_PASSWORD_LENGTH);
    setConfirmPasswordError(formState.password !== formState.confirmPassword);

    return !(
      !validateEmail(formState.email) ||
      formState.firstName === '' ||
      formState.lastName === '' ||
      formState.password.length < MIN_PASSWORD_LENGTH ||
      formState.password !== formState.confirmPassword
    );
  };

  const handleSignUp = async event => {
    handleAuth(
      event,
      `${BACKEND_ENDPOINT}${EMAIL_AUTH_REGISTER_ENDPOINT}`,
      {
        name: [
          transformName(formState.firstName),
          transformName(formState.lastName),
        ].join(' '),
        email: formState.email,
        password: formState.password,
      },
      setErrorMessage,
      validateFields,
    );
  };

  return (
    <>
      <Header>Sign up</Header>
      <Form onSubmit={handleSignUp}>
        <Error>{errorMessage}</Error>
        <NamesSection>
          <TextboxWrapper>
            <Textbox
              options={{ width: '100%', name: 'firstname' }}
              placeholder="First Name"
              error={firstNameError}
              text={formState.firstName}
              setText={value => {
                setFirstName(value);
                setFirstNameError(false);
              }}
            />
          </TextboxWrapper>
          <Spacer />
          <TextboxWrapper>
            <Textbox
              options={{ width: '100%', name: 'lastname' }}
              placeholder="Last Name"
              error={lastNameError}
              text={formState.lastName}
              setText={value => {
                setLastName(value);
                setLastNameError(false);
              }}
            />
          </TextboxWrapper>
        </NamesSection>
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
            error={passwordError}
            text={formState.password}
            setText={value => {
              setPassword(value);
              setPasswordError(
                passwordError &&
                  formState.password.length < MIN_PASSWORD_LENGTH,
              );
            }}
          />
        </TextboxWrapper>
        <TextboxWrapper>
          <Textbox
            options={{ width: '100%', type: 'password' }}
            placeholder="Confirm Password"
            error={confirmPasswordError}
            text={formState.confirmPassword}
            setText={value => {
              setConfirmPassword(value);
              setConfirmPasswordError(
                confirmPasswordError && value !== formState.password,
              );
            }}
          />
        </TextboxWrapper>
        <Button margin="0 0 16px 0" width="100%" handleClick={handleSignUp}>
          Sign Up
        </Button>
      </Form>
    </>
  );
};

SignupContent.propTypes = {
  handleAuth: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
};

export default SignupContent;
