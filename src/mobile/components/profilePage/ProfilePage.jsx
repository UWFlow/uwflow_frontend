import React, { useState } from 'react';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import ModalHOC from '../../../sharedComponents/modal/ModalHOC';
import CourseReviewCourseBox from '../../../sharedComponents/coursePage/CourseReviewCourseBox';
import LoadingSpinner from '../../../sharedComponents/display/LoadingSpinner';
import CompleteProfileContent from '../../../sharedComponents/profilePage/CompleteProfileContent';
import CollapseableContainer from '../common/CollapseableContainer';
import ShortlistContent from '../../../sharedComponents/profilePage/ShortlistContent';

/* Styled Components */
import {
  ProfilePageWrapper,
  CompleteProfileWrapper,
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
