import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfileFinalExamsWrapper,
  ProfileFinalExamsHeader,
  LastUpdatedText,
  LastUpdatedLink,
} from './styles/ProfileFinalExams';

import FinalExamTable from '../../../sharedComponents/profilePage/FinalExamTable';

const ProfileFinalExams = ({ courses, lastUpdated }) => {
  return (
    <>
      <ProfileFinalExamsWrapper>
        <ProfileFinalExamsHeader>
          On campus final exams
        </ProfileFinalExamsHeader>
        <FinalExamTable courses={courses} />
      </ProfileFinalExamsWrapper>
      <LastUpdatedText>
        Last updated {lastUpdated.time} minutes ago from
        {' '}
        <LastUpdatedLink href={lastUpdated.url} target="_blank">
          {lastUpdated.url}
        </LastUpdatedLink>
      </LastUpdatedText>
    </>
  );
};

ProfileFinalExams.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.string),
    time: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string
  })),
  lastUpdated: PropTypes.object
};

export default ProfileFinalExams;
