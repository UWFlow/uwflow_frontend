import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  Wrapper,
  ContentWrapper,
  Header,
  ForgotPasswordWrapper,
  ForgotPasswordText,
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
import { BACKEND_ENDPOINT, EMAIL_AUTH_LOGIN_ENDPOINT } from '../../../constants/Api';

const LoginContent = ({ onSwitchModal, formState, setEmail, setPassword }) => {
  const [emailError, setEmailError] = useState(false);

  const validateFields = () => {
    const emailValid = validateEmail(formState.email);
    setEmailError(!emailValid);
    return emailValid;
  }
  
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    const responseData = await fetch(`${BACKEND_ENDPOINT}${EMAIL_AUTH_LOGIN_ENDPOINT}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
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
        <Header>Log in</Header>
        <Form onSubmit={handleLogin}>
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
          <ForgotPasswordWrapper>
            <ForgotPasswordText>Forgot password?</ForgotPasswordText>
          </ForgotPasswordWrapper>
          <Button margin="0 0 16px 0" width="100%" onClick={handleLogin}>
            Log in
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
        New to UW Flow?
        <SwapModalLink onClick={onSwitchModal}>Sign up</SwapModalLink>
      </SwapModalWrapper>
    </Wrapper>
  );
}

LoginContent.propTypes = {
  onSwitchModal: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LoginContent;
