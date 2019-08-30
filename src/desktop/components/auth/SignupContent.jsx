import React from 'react';

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
} from './styles/AuthModal';

/* Constants */
import {
  EMAIL_TEXTBOX_ID,
  PASSWORD_TEXTBOX_ID,
  FIRST_NAME_TEXTBOX_ID,
  LAST_NAME_TEXTBOX_ID,
  CONFIRM_PASSWORD_TEXTBOX_ID,
} from './AuthModal';

/* Child Components */
import SocialLoginContent from './SocialLoginContent';
import Textbox from '../common/Textbox';
import Button from '../common/Button';

const SignupContent = ({ onSwitchModal }) => (
  <Wrapper>
    <ContentWrapper>
      <Header>Sign up</Header>
      <NamesSection>
        <TextboxWrapper>
          <Textbox
            options={{ width: '100%' , name: 'firstname' }}
            ID={FIRST_NAME_TEXTBOX_ID}
            initialPlaceholder="First Name"
          />
        </TextboxWrapper>
        <Spacer />
        <TextboxWrapper>
          <Textbox
            options={{ width: '100%', name: 'lastname' }}
            ID={LAST_NAME_TEXTBOX_ID}
            initialPlaceholder="Last Name"
          />
        </TextboxWrapper>
      </NamesSection>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%', type: 'email' }}
          ID={EMAIL_TEXTBOX_ID}
          initialPlaceholder="Email address"
        />
      </TextboxWrapper>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%', type: 'password' }}
          ID={PASSWORD_TEXTBOX_ID}
          initialPlaceholder="Password"
        />
      </TextboxWrapper>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%', type: 'password' }}
          ID={CONFIRM_PASSWORD_TEXTBOX_ID}
          initialPlaceholder="Confirm Password"
        />
      </TextboxWrapper>
      <Button margin="0 0 16px 0" width="100%">
        Sign Up
      </Button>
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

export default SignupContent;
