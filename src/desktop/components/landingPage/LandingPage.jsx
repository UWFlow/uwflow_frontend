import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import {
  LandingPageWrapper,
  Column1TextWrapper,
  Column1,
  Column2,
  TitleText,
  Subheading,
  BackgroundImage,
  BlueBackground,
  AuthContent,
  LogoWrapper
} from './styles/LandingPage';

/* Child Components */
import AuthForm from '../../../auth/AuthForm';
import Background from '../../../img/background.png';

import { getIsLoggedIn } from '../../../data/reducers/AuthReducer';
import SearchBar from '../../../sharedComponents/navigation/SearchBar';
import FlowLogo from '../../../sharedComponents/navigation/FlowLogo';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
});

const LandingPage = ({ isLoggedIn }) => {
  return (
    <LandingPageWrapper>
      <Column1 loggedIn={isLoggedIn}>
        <Column1TextWrapper>
          <LogoWrapper>
            <FlowLogo />
          </LogoWrapper>
          <TitleText>
            Join 16,500+
            <br /> UW students on Flow
          </TitleText>
          <SearchBar />
          <Subheading>
            Plan courses
            <br />
            Read course and professor reviews
            <br />
            Export your class and exam schedule
          </Subheading>
        </Column1TextWrapper>
      </Column1>
      <Column2 loggedIn={isLoggedIn}>
        <BlueBackground />
        <BackgroundImage image={Background} />
        {!isLoggedIn && (
          <AuthContent>
            <AuthForm />
          </AuthContent>
        )}
      </Column2>
    </LandingPageWrapper>
  );
};

export default connect(mapStateToProps)(LandingPage);
