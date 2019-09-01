import React from 'react';
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
} from './styles/AuthModal';

/* Child Components */
import SocialLoginContent from './SocialLoginContent';
import Textbox from '../common/Textbox';
import Button from '../common/Button';

const LoginContent = ({ onSwitchModal, formState, setEmail, setPassword }) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Header>Log in</Header>
        <TextboxWrapper>
          <Textbox
            options={{ width: '100%', type: 'email' }}
            placeholder="Email address"
            text={formState.email}
            setText={setEmail}
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
        <Button margin="0 0 16px 0" width="100%">
          Log in
        </Button>
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
