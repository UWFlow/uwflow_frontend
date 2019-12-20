import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Styled Components */
import { WelcomePageWrapper } from './styles/WelcomePage';

/* Child Components */
import TranscriptUploadModalContent from '../../components/dataUploadModals/TranscriptUploadModalContent';
import ScheduleUploadModalContent from '../../components/dataUploadModals/ScheduleUploadModalContent';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';

/* Constants */
import { LANDING_PAGE_ROUTE } from '../../Routes';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const WelcomePage = ({ history, isLoggedIn }) => {
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
          onSkip={() =>
            history.push(
              history.location.state && history.location.state.prevPath
                ? history.location.state.prevPath
                : LANDING_PAGE_ROUTE,
            )
          }
          showSkipStepButton={true}
        />
      )}
    </WelcomePageWrapper>
  );
};

export default withRouter(connect(mapStateToProps)(WelcomePage));
