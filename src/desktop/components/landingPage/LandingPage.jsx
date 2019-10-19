import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import {
  LandingPageWrapper,
  LandingPageContent,
  Column1,
  Column2,
  TitleText,
  Subheading,
  BackgroundImage,
  BlueBackground,
  AuthContent,
} from './styles/LandingPage';

/* Child Components */
import AuthForm from '../../../auth/AuthForm';
import Background from '../../../img/background.png';

import { getIsLoggedIn } from '../../../data/reducers/AuthReducer';
import SearchBar from '../../../sharedComponents/navbar/SearchBar';


const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
});

const LandingPage = ({ isLoggedIn }) => {
  return (
    <LandingPageWrapper>
      <LandingPageContent>
        <Column1>
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
        </Column1>
        <Column2>
          <BlueBackground />
          <BackgroundImage image={Background} />
          {!isLoggedIn && <AuthContent>
            <AuthForm />
          </AuthContent>}
        </Column2>
      </LandingPageContent>
    </LandingPageWrapper>
  );
};

export default connect(mapStateToProps)(LandingPage);
