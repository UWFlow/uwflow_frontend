import React, { useState } from 'react';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import ShortlistBox from './ShortlistBox';
import ProfileCalendar from './ProfileCalendar';
import ProfileCourses from './ProfileCourses';
import ProfileFinalExams from './ProfileFinalExams';
import ModalHOC from '../../../sharedComponents/modal/ModalHOC';
import CourseReviewCourseBox from '../../../sharedComponents/coursePage/CourseReviewCourseBox';
import LoadingSpinner from '../../../sharedComponents/display/LoadingSpinner';
import CompleteProfileContent from '../../../sharedComponents/profilePage/CompleteProfileContent';

/* Styled Components */
import {
  ProfilePageWrapper,
  CompleteProfileWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfilePage';

const ProfilePageContent = ({ user }) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const courseCodes = user.courses_taken.map(
    course_taken => course_taken.course.code,
  );

  return (
    <>
      <ProfileInfoHeader user={user} />
      <ColumnWrapper>
        <Column1>
          <ProfileCalendar />
          <ProfileCourses
            courses={user.courses_taken}
            setReviewCourse={setSelectedCourseIndex}
            openModal={() => setReviewModalOpen(true)}
          />
          <ProfileFinalExams courses={user.courses_taken} />
        </Column1>
        <Column2>
          <CompleteProfileWrapper>
            <CompleteProfileContent user={user} />
          </CompleteProfileWrapper>
          <ShortlistBox shortlistCourses={user.shortlist} />
        </Column2>
      </ColumnWrapper>
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
};

const ProfilePage = ({ data }) => (
  <ProfilePageWrapper>
    <ProfilePageContent user={{ ...data.user[0] }} />
  </ProfilePageWrapper>
);

export default ProfilePage;
