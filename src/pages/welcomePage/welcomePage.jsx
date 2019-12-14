import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

/* Styled Components */
import { WelcomePageWrapper } from './styles/welcomePage';

/* Constants */
import { LANDING_PAGE_ROUTE } from '../../Routes';

/* Child Components */
import TranscriptUploadModalContent from '../../desktop/components/dataUploadModals/TranscriptUploadModalContent';
import ScheduleUploadModalContent from '../../desktop/components/dataUploadModals/ScheduleUploadModalContent';

const WelcomePage = ({ history }) => {
  const [isUploadingTranscript, setIsUploadingTranscript] = useState(true);
  const [isUploadingSchedule, setIsUploadingSchedule] = useState(false);

  return (
    <WelcomePageWrapper>
      {isUploadingTranscript && (
        <TranscriptUploadModalContent
          onSkip={() => {
            setIsUploadingTranscript(false);
            setIsUploadingSchedule(true);
          }}
        />
      )}
      {isUploadingSchedule && (
        <ScheduleUploadModalContent
          onSkip={() =>
            history.push(
              history.location.state && history.location.state.prevPage
                ? history.location.state.prevPage
                : LANDING_PAGE_ROUTE,
            )
          }
        />
      )}
    </WelcomePageWrapper>
  );
};

export default withRouter(WelcomePage);
