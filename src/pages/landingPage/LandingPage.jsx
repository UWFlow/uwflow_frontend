import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import {
  ProfileWrapper,
  LandingPageWrapper,
  Column1TextWrapper,
  Column1,
  Column2,
  TitleText,
  Subheading,
  BackgroundImage,
  BlueBackground,
  AuthContent
} from './styles/LandingPage';

/* Child Components */
import AuthForm from '../../auth/AuthForm';
import Background from '../../img/background.png';

import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import SearchBar from '../../components/navigation/SearchBar';
import ProfileDropdown from '../../components/navigation/ProfileDropdown';
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  isDesktop: getIsBrowserDesktop(state)
});

const LandingPage = ({ isLoggedIn, isDesktop }) => {
  return (
    <LandingPageWrapper>
      {isDesktop && <Column2 loggedIn={isLoggedIn}>
        <BlueBackground />
        <BackgroundImage image={Background} />
        {!isLoggedIn && (
          <AuthContent>
            <AuthForm />
          </AuthContent>
        )}
      </Column2>}
      <Column1 loggedIn={isLoggedIn}>
        <Column1TextWrapper>
          <ProfileWrapper>
            {(isLoggedIn || !isDesktop) && <ProfileDropdown /> }
          </ProfileWrapper>
          <TitleText>
            UW Flow
          </TitleText>
          <SearchBar isLanding />
          <Subheading>
            Plan courses
            <br /><br />
            Read course and professor reviews
            <br /><br />
            Export your schedule
          </Subheading>
        </Column1TextWrapper>
      </Column1>
    </LandingPageWrapper>
  );
};

export default connect(mapStateToProps)(LandingPage);
