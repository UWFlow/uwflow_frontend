import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import CompleteProfileBox from './CompleteProfileBox';
import ShortlistBox from './ShortlistBox';
import ProfileCalendar from './ProfileCalendar';
import ProfileCourses from './ProfileCourses';
import ProfileFinalExams from './ProfileFinalExams';
import ModalHOC from '../../../basicComponents/modal/ModalHOC';
import CourseReviewCourseBox from '../coursePage/CourseReviewCourseBox';

/* Styled Components */
import {
  ProfilePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfilePage';

const dummyCourses = [
  {
    term: '1195',
    termName: 'Spring 2019',
    code: 'CS 488',
    name: 'Introduction to Computer Graphics',
    liked: 87,
  },
  {
    term: '1195',
    termName: 'Spring 2019',
    code: 'ECE 222',
    name: 'Digital Computers',
    liked: 55,
  },
  {
    term: '1195',
    termName: 'Spring 2019',
    code: 'CS 341',
    name: 'Algorithms',
    liked: 95,
  },
  {
    term: '1191',
    termName: 'Fall 2018',
    code: 'ECE 124',
    name: 'Digital Circuits',
    liked: 67,
  },
  {
    term: '1191',
    termName: 'Fall 2018',
    code: 'CS 241',
    name: 'Foundations of Sequential Programs',
    liked: 82,
  },
];

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

const dummyShortlist = [
  {
    code: 'CS 480',
    name: 'Introduction to Machine Learning',
  },
  {
    code: 'CO 487',
    name: 'Applied Cryptography',
  },
];

const ProfilePageContent = ({ user }) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const courseCodes = dummyCourses.map(course => course.code);

  return (
    <>
      <ProfileInfoHeader user={user} />
      <ColumnWrapper>
        <Column1>
          <ProfileCalendar />
          <ProfileCourses
            courses={dummyCourses}
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
          <CompleteProfileBox
            hasScheduleUploaded={true}
            hasCourseInfo={true}
            hasCoursesReviewed={false}
            hasProfsReviewed={false}
          />
          <ShortlistBox shortlistCourses={dummyShortlist} />
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

const ProfilePage = ({ loading, error, data }) => (
  <ProfilePageWrapper>
    {loading ? (
      <p>Loading ...</p>
    ) : error || !data ? (
      <div>Error</div>
    ) : (
      <ProfilePageContent user={{ ...data.user[0] }} />
    )}
  </ProfilePageWrapper>
);

export default ProfilePage;
