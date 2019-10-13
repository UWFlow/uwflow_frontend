import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

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

import { isLoggedIn } from '../../../utils/Auth';
import { PROFILE_PAGE_ROUTE } from '../../../Routes';
import SearchBar from '../common/SearchBar';

const LandingPage = ({ history }) => {
  const [, forceUpdate] = useState(false);

  const handleAuthComplete = () => {
    forceUpdate(x => !x);
  };

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
          <AuthContent>
            {isLoggedIn() ? (
              history.push(PROFILE_PAGE_ROUTE)
            ) : (
              <AuthForm onAuthComplete={handleAuthComplete} />
            )}
          </AuthContent>
        </Column2>
      </LandingPageContent>
    </LandingPageWrapper>
  );
};

export default withRouter(LandingPage);
