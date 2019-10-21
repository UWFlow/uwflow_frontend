import React, { useState } from 'react';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import ModalHOC from '../../../sharedComponents/modal/ModalHOC';
import CourseReviewCourseBox from '../../../sharedComponents/coursePage/CourseReviewCourseBox';
import LoadingSpinner from '../../../sharedComponents/display/LoadingSpinner';
import CompleteProfileContent from '../../../sharedComponents/profilePage/CompleteProfileContent';
import CollapseableContainer from '../common/CollapseableContainer';
import ShortlistContent from '../../../sharedComponents/profilePage/ShortlistContent';
import FinalExamTable from '../../../sharedComponents/coursePage/FinalExamTable';

/* Styled Components */
import {
  ProfilePageWrapper,
  CompleteProfileWrapper,
  ProfileFinalExamsHeader,
  ProfileFinalExamsWrapper,
  ProfileFinalExamsContent,
} from './styles/ProfilePage';

import { processMultipleCourseExams } from '../../../utils/FinalExams';

const ProfilePageContent = ({ user }) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const courseCodes = user.courses_taken.map(course_taken => course_taken.course.code);

  return (
    <>
      <ProfileInfoHeader user={user} />
      <CompleteProfileWrapper>
        <CompleteProfileContent user={user} />
      </CompleteProfileWrapper>
      <CollapseableContainer title="Shortlist" centerHeader={false}>
        <ShortlistContent shortlistCourses={user.shortlist} />
      </CollapseableContainer>
      <ProfileFinalExamsWrapper>
        <ProfileFinalExamsHeader>
          On campus final exams
        </ProfileFinalExamsHeader>
        <ProfileFinalExamsContent>
          <FinalExamTable courses={processMultipleCourseExams(user.courses_taken)} />
        </ProfileFinalExamsContent>
      </ProfileFinalExamsWrapper>
      <ModalHOC
        isModalOpen={reviewModalOpen}
        onCloseModal={() => setReviewModalOpen(false)}
      >
        <CourseReviewCourseBox
          showCourseDropdown
          courseIDList={courseCodes}
          selectedCourseIndex={selectedCourseIndex}
          setSelectedCourseIndex={setSelectedCourseIndex}
          onCancel={() => setReviewModalOpen(false)}
        />
      </ModalHOC>
    </>
  );
}

const ProfilePage = ({ loading, data, error }) => (
  <ProfilePageWrapper>
    {loading
      ? (<LoadingSpinner />)
      : (error || !data)
        ? <div>Error</div>
        : (
          <ProfilePageContent user={{...data.user[0]}} />
        )
    }
  </ProfilePageWrapper>
);

export default ProfilePage;
