import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LANDING_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from 'Routes';

import ScheduleUploadModalContent from 'components/upload/ScheduleUploadModalContent';
import TranscriptUploadModalContent from 'components/upload/TranscriptUploadModalContent';
import { RootState } from 'data/reducers/RootReducer';

import { WelcomePageWrapper } from './styles/WelcomePage';

const WelcomePage = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  const [isUploadingTranscript, setIsUploadingTranscript] = useState(true);
  const [isUploadingSchedule, setIsUploadingSchedule] = useState(false);

  if (!isLoggedIn) {
    history.push(LANDING_PAGE_ROUTE);
  }

  return (
    <WelcomePageWrapper>
      {isUploadingTranscript && (
        <TranscriptUploadModalContent
          onSkip={() => {
            setIsUploadingTranscript(false);
            setIsUploadingSchedule(true);
          }}
          showSkipStepButton={true}
        />
      )}
      {isUploadingSchedule && (
        <ScheduleUploadModalContent
          onSkip={() => {
            setIsUploadingSchedule(false);
            history.push(PROFILE_PAGE_ROUTE);
          }}
          showSkipStepButton={true}
        />
      )}
    </WelcomePageWrapper>
  );
};

export default WelcomePage;
