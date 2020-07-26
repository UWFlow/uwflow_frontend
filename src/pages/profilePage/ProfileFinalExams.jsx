import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';

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
  const exams = processMultipleCourseExams(courses);
  const updatedAt = moment.max(
    courses.map((c) =>
      moment.max(c.course.sections.map((s) => moment(s.updated_at))),
    ),
  );
  return (
    <>
      <ProfileFinalExamsWrapper>
        <ProfileFinalExamsHeader>On campus final exams</ProfileFinalExamsHeader>
        <ProfileFinalExamsContent hasExams={exams.length > 0}>
          <FinalExamTable courses={exams} />
        </ProfileFinalExamsContent>
      </ProfileFinalExamsWrapper>
      <LastUpdatedSchedule updatedAt={updatedAt} />
    </>
  );
};

ProfileFinalExams.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default ProfileFinalExams;
