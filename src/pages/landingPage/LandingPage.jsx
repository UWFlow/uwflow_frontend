import React from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import {
  ProfileWrapper,
  LandingPageWrapper,
  Column1,
  Column2,
  TitleText,
  Subheading,
  BackgroundImage,
  LogoText,
  AuthContent
} from './styles/LandingPage';

/* Child Components */
import AuthForm from '../../auth/AuthForm';

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
      <BackgroundImage>
        <ProfileWrapper>
          {(isLoggedIn || !isDesktop) && <ProfileDropdown /> }
        </ProfileWrapper>
        <LogoText>
          UW Flow
        </LogoText>
        <Column1 loggedIn={isLoggedIn}>
          <TitleText>
            Explore over 20,000 course and professor reviews from UW students
          </TitleText>
          <SearchBar isLanding />
          <Subheading>
            Plan courses
            <br /><br />
            Read course and professor reviews
            <br /><br />
            Export your schedule
          </Subheading>
        </Column1>
        {isDesktop && <Column2 loggedIn={isLoggedIn}>
          {!isLoggedIn && (
            <AuthContent>
              <AuthForm />
            </AuthContent>
          )}
        </Column2>}
      </BackgroundImage>
    </LandingPageWrapper>
  );
};

export default connect(mapStateToProps)(LandingPage);
