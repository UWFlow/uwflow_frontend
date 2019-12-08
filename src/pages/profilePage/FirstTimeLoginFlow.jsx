import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

/* Styled Components */
import { BlankPage } from './styles/ProfilePage';

/* Constants */
import { PROFILE_PAGE_ROUTE } from '../../Routes';

/* Child Components */
import TranscriptUploadModal from '../../desktop/components/dataUploadModals/TranscriptUploadModal';
import ScheduleUploadModal from '../../desktop/components/dataUploadModals/ScheduleUploadModal';

const FirstTimeLoginFlow = ({ history }) => {
  const [isUploadingTranscript, setIsUploadingTranscript] = useState(true);
  const [isUploadingSchedule, setIsUploadingSchedule] = useState(false);
  console.log('HEERE');
  return (
    <>
      <TranscriptUploadModal
        isModalOpen={isUploadingTranscript}
        onCloseModal={() => setIsUploadingTranscript(false)}
        onAfterClose={() => setIsUploadingSchedule(true)}
      />
      <ScheduleUploadModal
        isModalOpen={isUploadingSchedule}
        onCloseModal={() => setIsUploadingSchedule(false)}
        onAfterClose={() => history.push(PROFILE_PAGE_ROUTE)}
      />
    </>
  );
};

export default withRouter(FirstTimeLoginFlow);
