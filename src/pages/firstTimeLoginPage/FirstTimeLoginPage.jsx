import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

/* Styled Components */
import { FirstTimeLoginPageWrapper } from './styles/FirstTimeLoginPage';

/* Constants */
import { LANDING_PAGE_ROUTE } from '../../Routes';

/* Child Components */
import TranscriptUploadModalContent from '../../desktop/components/dataUploadModals/TranscriptUploadModalContent';
import ScheduleUploadModalContent from '../../desktop/components/dataUploadModals/ScheduleUploadModalContent';

const FirstTimeLoginPage = ({ history }) => {
  const [isUploadingTranscript, setIsUploadingTranscript] = useState(true);
  const [isUploadingSchedule, setIsUploadingSchedule] = useState(false);

  return (
    <FirstTimeLoginPageWrapper>
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
    </FirstTimeLoginPageWrapper>
  );
};

export default withRouter(FirstTimeLoginPage);
