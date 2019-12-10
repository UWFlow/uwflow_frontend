import React from 'react';

/* Styled Components */
import { LastUpdatedText, LastUpdatedLink } from './styles/LastUpdatedSchedule';

const LastUpdatedSchedule = () => {
  // TODO fetch/calculate actual update time
  return (
    <LastUpdatedText>
      Last updated 20 minutes ago from{' '}
      <LastUpdatedLink
        href={'http://www.adm.uwaterloo.ca/infocour/CIR/SA/under.html'}
        target="_blank"
      >
        adm.uwaterloo.ca
      </LastUpdatedLink>
    </LastUpdatedText>
  );
};

export default LastUpdatedSchedule;
