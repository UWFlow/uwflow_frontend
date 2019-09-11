import React, {useState} from 'react';
import { Link } from 'react-router-dom';

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
  AuthContent
} from './styles/LandingPage';

/* Child Components */
import AuthForm from '../auth/AuthForm';
import Background from '../../../img/background.png';

import { isLoggedIn } from '../../../utils/Auth';
import { PROFILE_PAGE_ROUTE } from '../../../Routes';

const LandingPage = () => {
  const [, forceUpdate] = useState(false);

  const handleAuthComplete = () => {
    forceUpdate(x => !x);
  }

  return (
    <LandingPageWrapper>
      <LandingPageContent>
        <Column1>
          <TitleText>Join 16,500+<br /> UW students on Flow</TitleText>
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
            {isLoggedIn()
              ? <div>Welcome to UW Flow!<br /><Link to={PROFILE_PAGE_ROUTE}>Profile</Link></div>
              : <AuthForm onAuthComplete={handleAuthComplete} />}
          </AuthContent>
        </Column2>
      </LandingPageContent>
    </LandingPageWrapper>
  );
};

export default LandingPage;
