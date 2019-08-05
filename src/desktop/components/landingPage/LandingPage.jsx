import React from 'react';
import { withRouter } from 'react-router-dom';

/* Styled Components */
import { Background } from './styles/LandingPage';

/* Child Components */
import BackgroundAnimation from './BackgroundAnimation';

const LandingPage = () => {
  return (
    <>
      <BackgroundAnimation />
      <Background />
    </>
  );
};

export default withRouter(LandingPage);
