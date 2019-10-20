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

const dummyFinals = [
  {
    code: 'ECE 105',
    sections: ['101', '102'],
    time: '9:00 AM - 11:30 AM',
    date: 'Friday, Aug 9th',
    location: 'PAC 1, 2, 3',
  },
  {
    code: 'MATH 239',
    sections: ['201', '202'],
    time: '12:30 PM - 3:00 PM',
    date: 'Tuesday, Aug 13th',
    location: 'MC 1006',
  },
];

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
          <ProfileFinalExams
            courses={dummyFinals}
            lastUpdated={{
              time: 18,
              url: 'adm.uwaterloo.ca',
            }}
          />
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
