import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Styled Components */

/* Selectors */
import { getIsBrowserDesktop } from 'data/reducers/RootReducer';

/* Constants */
import { PROFILE_PAGE_ROUTE, WELCOME_PAGE_ROUTE } from 'Routes';

/* Child Components */
import AuthForm from 'auth/AuthForm';
import SearchBar from 'components/navigation/SearchBar';
import ProfileDropdown from 'components/navigation/ProfileDropdown';
import {
  ProfileWrapper,
  Nav,
  LandingPageWrapper,
  Column,
  TitleSearchBarWrapper,
  TitleText,
  SubtitleText,
  BackgroundImage,
  LogoText,
  AuthContent,
} from './styles/LandingPage';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.loggedIn,
  isDesktop: getIsBrowserDesktop(state),
});

const LandingPage = ({ isLoggedIn, isDesktop, history }) => {
  return (
    <LandingPageWrapper>
      <Nav>
        <LogoText>UW Flow</LogoText>
        <ProfileWrapper>
          {(isLoggedIn || !isDesktop) && <ProfileDropdown />}
        </ProfileWrapper>
      </Nav>
      <BackgroundImage>
        <Column loggedIn={isLoggedIn}>
          <TitleSearchBarWrapper>
            <TitleText>
              Explore thousands of course and professor reviews from UW students
            </TitleText>
            <SearchBar isLanding />
            <SubtitleText>
              Plan your courses • Read course and professor reviews • Export
              your schedule
            </SubtitleText>
          </TitleSearchBarWrapper>
          {isDesktop && !isLoggedIn && (
            <AuthContent>
              <AuthForm
                margin="auto 0"
                onLoginComplete={() => history.push(PROFILE_PAGE_ROUTE)}
                onSignupComplete={() =>
                  history.push(WELCOME_PAGE_ROUTE, {
                    prevPage: PROFILE_PAGE_ROUTE,
                  })
                }
              />
            </AuthContent>
          )}
        </Column>
      </BackgroundImage>
    </LandingPageWrapper>
  );
};

export default connect(mapStateToProps)(withRouter(LandingPage));
