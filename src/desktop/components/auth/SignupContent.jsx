import React from 'react';
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
} from './styles/AuthModal';

/* Child Components */
import SocialLoginContent from './SocialLoginContent';
import Textbox from '../common/Textbox';
import Button from '../common/Button';


const SignupContent = ({
  onSwitchModal,
  formState,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword
}) => {
  const handleSignUp = () => {

  }

  return (
    <Wrapper>
      <ContentWrapper>
        <Header>Sign up</Header>
        <NamesSection>
          <TextboxWrapper>
            <Textbox
              options={{ width: '100%' , name: 'firstname' }}
              placeholder="First Name"
              text={formState.firstName}
              setText={(e) => setFirstName(e)}  
            />
          </TextboxWrapper>
          <Spacer />
          <TextboxWrapper>
            <Textbox
              options={{ width: '100%', name: 'lastname' }}
              placeholder="Last Name"
              text={formState.lastName}
              setText={setLastName}  
            />
          </TextboxWrapper>
        </NamesSection>
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
        <TextboxWrapper>
          <Textbox
            options={{ width: '100%', type: 'password' }}
            placeholder="Confirm Password"
            text={formState.confirmPassword}
            setText={setConfirmPassword}
          />
        </TextboxWrapper>
        <Button
          margin="0 0 16px 0"
          width="100%"
          handleClick={handleSignUp}
        >
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
