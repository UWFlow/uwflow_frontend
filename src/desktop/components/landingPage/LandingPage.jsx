import React from 'react';
import { withRouter } from 'react-router-dom';

/* Styled Components */
import { Background } from './styles/LandingPage';

/* Child Components */
import BackgroundAnimation from './BackgroundAnimation';

const LandingPage = () => {
  return (
    <>
      {/*}
      <PageWrapper>
        <Link to="/profile">Landing Page</Link>
        <TitleText>FLOW 2.0</TitleText>
      </PageWrapper>
      {*/}
      <BackgroundAnimation />
      <Background />
    </>
  );
};

export default withRouter(LandingPage);
