import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  Wrapper,
  ContentWrapper,
  Header,
  NamesSection,
  Spacer,
  OrWrapper,
  PrivacyWrapper,
  PrivacyPolicyText,
  GreyText,
  SwapModalWrapper,
  SwapModalLink,
  TextboxWrapper,
  Form
} from './styles/AuthModal';

/* Child Components */
import SocialLoginContent from './SocialLoginContent';
import Textbox from '../common/Textbox';
import Button from '../common/Button';

import { validateEmail } from '../../../utils/Email';
import { BACKEND_ENDPOINT, EMAIL_AUTH_REGISTER_ENDPOINT } from '../../../constants/Api';

const SignupContent = ({
  onSwitchModal,
  formState,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword
}) => {
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const validateFields = () => {
    setEmailError(!validateEmail(formState.email));
    setFirstNameError(formState.firstName === '');
    setLastNameError(formState.lastName === '');
    setConfirmPasswordError(formState.password !== formState.confirmPassword);

    return !validateEmail(formState.email)
            || formState.firstName === ''
            || formState.lastName === ''
            || formState.password !== formState.confirmPassword;
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    
    if (!validateFields()) {
      return;
    }

    // register
    const responseData = await fetch(`${BACKEND_ENDPOINT}${EMAIL_AUTH_REGISTER_ENDPOINT}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          full_name: [formState.firstName, formState.lastName].join(' '),
          email: formState.email,
          password: formState.password
        }
      })
    });
  
    const response = await responseData.json();
    console.log(response);
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <Header>Sign up</Header>
        <Form onSubmit={handleSignUp}>
          <NamesSection>
            <TextboxWrapper>
              <Textbox
                options={{ width: '100%' , name: 'firstname' }}
                placeholder="First Name"
                error={firstNameError}
                text={formState.firstName}
                setText={(value) => {
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
                setText={(value) => {
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
              setText={(value) => {
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
          <TextboxWrapper>
            <Textbox
              options={{ width: '100%', type: 'password' }}
              placeholder="Confirm Password"
              error={confirmPasswordError}
              text={formState.confirmPassword}
              setText={(value) => {
                setConfirmPassword(value);
                setConfirmPasswordError(value !== formState.password);
              }}
            />
          </TextboxWrapper>
          <Button margin="0 0 16px 0" width="100%" handleClick={handleSignUp}>
            Sign Up
          </Button>
        </Form>
        <OrWrapper>OR</OrWrapper>
        <SocialLoginContent />
        <PrivacyWrapper>
          <GreyText>Read our </GreyText>
          <PrivacyPolicyText>Privacy Policy</PrivacyPolicyText>
        </PrivacyWrapper>
      </ContentWrapper>
      <SwapModalWrapper>
        Already have an account?
        <SwapModalLink onClick={onSwitchModal}>Log in </SwapModalLink>
      </SwapModalWrapper>
    </Wrapper>
  );
}

SignupContent.propTypes = {
  onSwitchModal: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setConfirmPassword: PropTypes.func.isRequired
}

export default SignupContent;
