import React from 'react';

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
} from './styles/AuthModal';

/* Constants */
import { EMAIL_TEXTBOX_ID, PASSWORD_TEXTBOX_ID } from './AuthModal';

/* Child Components */
import Textbox from '../common/Textbox';
import Button from '../common/Button';

const LoginContent = ({ onSwitchModal }) => (
  <Wrapper>
    <ContentWrapper>
      <Header>Log in</Header>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%' }}
          ID={EMAIL_TEXTBOX_ID}
          initialPlaceholder="Email address"
        />
      </TextboxWrapper>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%' }}
          ID={PASSWORD_TEXTBOX_ID}
          initialPlaceholder="Password"
        />
      </TextboxWrapper>
      <ForgotPasswordWrapper>
        <ForgotPasswordText>Forgot password?</ForgotPasswordText>
      </ForgotPasswordWrapper>
      <Button margin="0 0 16px 0" width="100%">
        Log in
      </Button>
      <OrWrapper>OR</OrWrapper>
      {/* TODO: FB and Google login buttons */}
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

export default LoginContent;
