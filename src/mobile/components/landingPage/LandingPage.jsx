import React from 'react';

/* Styled Components */
import {
  LandingPageWrapper,
  LandingPageContent,
  TitleText,
  Subheading,
  LogoProfileWrapper,
  TextSpacing
} from './styles/LandingPage';

/* Child Components */
import SearchBar from '../../../sharedComponents/navigation/SearchBar';
import ProfileDropdown from '../../../sharedComponents/navigation/ProfileDropdown';
import FlowLogo from '../../../sharedComponents/navigation/FlowLogo';

const LandingPage = () => {
  return (
    <>
      <LandingPageWrapper>
        <LogoProfileWrapper>
          <FlowLogo />
          <ProfileDropdown />
        </LogoProfileWrapper>
        <LandingPageContent>
          <TitleText>
            Join 25,000+
            <br />
            UW students on Flow
          </TitleText>
          <SearchBar />
          <TextSpacing />
          <TextSpacing />
          <Subheading>
            Plan courses
            <TextSpacing />
            Read course and professor reviews
            <TextSpacing />
            Export your class and exam schedule
          </Subheading>
        </LandingPageContent>
      </LandingPageWrapper>
    </>
  );
};

export default LandingPage;
