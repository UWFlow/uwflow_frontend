import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* Styled Components */
import {
  LandingPageWrapper,
  LandingPageContent,
  TitleText,
  Subheading,
} from './styles/LandingPage';

/* Child Components */
import SearchBar from '../../../desktop/components/common/SearchBar';

const LandingPage = () => {
  return (
    <>
      <LandingPageWrapper>
        <LandingPageContent>
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
        </LandingPageContent>
      </LandingPageWrapper>
    </>
  );
};

export default LandingPage;
