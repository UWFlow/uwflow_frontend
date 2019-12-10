import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfileFinalExamsWrapper,
  ProfileFinalExamsHeader,
  ProfileFinalExamsContent,
} from './styles/ProfileFinalExams';

import FinalExamTable from '../../components/common/FinalExamTable';
import LastUpdatedSchedule from '../../components/common/LastUpdatedSchedule';

import { processMultipleCourseExams } from '../../utils/FinalExams';

const ProfileFinalExams = ({ courses }) => {
  return (
    <>
      <ProfileFinalExamsWrapper>
        <ProfileFinalExamsHeader>On campus final exams</ProfileFinalExamsHeader>
        <ProfileFinalExamsContent>
          <FinalExamTable courses={processMultipleCourseExams(courses)} />
        </ProfileFinalExamsContent>
      </ProfileFinalExamsWrapper>
      <LastUpdatedSchedule />
    </>
  );
};

ProfileFinalExams.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default ProfileFinalExams;
