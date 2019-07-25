import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfileFinalExamsWrapper,
  ProfileFinalExamsHeader,
  LastUpdatedText,
  LastUpdatedLink
} from './styles/ProfileFinalExams';

const ProfileFinalExams = ({ courses, lastUpdated }) => {
  return (
    <>
      <ProfileFinalExamsWrapper>
        <ProfileFinalExamsHeader>
          On campus final exams
        </ProfileFinalExamsHeader>
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
  courses: PropTypes.arrayOf(PropTypes.object),
  lastUpdated: PropTypes.object
};

export default ProfileFinalExams;
