import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfileFinalExamsWrapper,
  ProfileFinalExamsHeader,
} from './styles/ProfileFinalExams';

import FinalExamTable from '../../../sharedComponents/coursePage/FinalExamTable';
import LastUpdatedSchedule from '../../../sharedComponents/coursePage/LastUpdatedSchedule';

const ProfileFinalExams = ({ courses }) => {
  return (
    <>
      <ProfileFinalExamsWrapper>
        <ProfileFinalExamsHeader>
          On campus final exams
        </ProfileFinalExamsHeader>
        <FinalExamTable courses={courses} />
      </ProfileFinalExamsWrapper>
      <LastUpdatedSchedule />
    </>
  );
};

ProfileFinalExams.propTypes = {
  courses: PropTypes.array.isRequired
};

export default ProfileFinalExams;
