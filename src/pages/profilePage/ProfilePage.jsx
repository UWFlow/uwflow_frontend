import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';

/* Child Components */
import ProfileInfoHeader from './ProfileInfoHeader';
import ShortlistBox from './ShortlistBox';
import ProfileCalendar from './ProfileCalendar';
import ProfileCourses from './ProfileCourses';
import ProfileFinalExams from './ProfileFinalExams';
import Modal from '../../components/display/Modal';
import CourseReviewCourseBox from '../../components/common/CourseReviewCourseBox';
import LoadingSpinner from '../../components/display/LoadingSpinner';
import CompleteProfileContent from './CompleteProfileContent';

/* Styled Components */
import {
  ProfilePageWrapper,
  CompleteProfileWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ProfilePage';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';

/* Queries */
import { GET_USER } from '../../graphql/queries/user/User';

/* Routes */
import { LANDING_PAGE_ROUTE } from '../../Routes';
import NotFoundPage from '../notFoundPage/NotFoundPage';
import { logOut } from '../../utils/Auth';
import FirstTimeLoginFlow from './FirstTimeLoginFlow';

const testSchedule = {
  schedule: [
    {
      section: {
        campus: 'UW U',
        class_number: 6544,
        id: 161,
        term_id: 1199,
        exams: [
          {
            date: '2019-12-19',
            day: 'Th',
            location: 'PAC 8',
            start_seconds: 32400,
            end_seconds: 41400,
          },
        ],
        meetings: [
          {
            days: ['T', 'Th', 'h'],
            end_date: '2019-12-03',
            end_seconds: 46200,
            is_cancelled: false,
            location: 'E2 1732',
            prof: {
              id: 5548,
              name: 'Ondrej Lhotak',
            },
            section_id: 161,
            start_date: '2019-09-04',
            start_seconds: 41400,
          },
        ],
        section_name: 'LEC 001',
        course: {
          name: 'Foundations of Sequential Programs (Enriched)',
          id: 1414,
          code: 'cs241e',
        },
      },
    },
    {
      section: {
        campus: 'UW U',
        class_number: 6545,
        id: 162,
        term_id: 1199,
        exams: [],
        meetings: [
          {
            days: ['W'],
            end_date: '2019-12-03',
            end_seconds: 62400,
            is_cancelled: false,
            location: 'PHY 313',
            prof: null,
            section_id: 162,
            start_date: '2019-09-04',
            start_seconds: 59400,
          },
        ],
        section_name: 'TUT 101',
        course: {
          name: 'Foundations of Sequential Programs (Enriched)',
          id: 1414,
          code: 'cs241e',
        },
      },
    },
    {
      section: {
        campus: 'UW U',
        class_number: 6546,
        id: 163,
        term_id: 1199,
        exams: [],
        meetings: [
          {
            days: ['W'],
            end_date: '2019-10-30',
            end_seconds: 75000,
            is_cancelled: false,
            location: null,
            prof: {
              id: 2656,
              name: 'Gang LU',
            },
            section_id: 163,
            start_date: '2019-10-30',
            start_seconds: 68400,
          },
        ],
        section_name: 'TST 201',
        course: {
          name: 'Foundations of Sequential Programs (Enriched)',
          id: 1414,
          code: 'cs241e',
        },
      },
    },
    {
      section: {
        campus: 'UW U',
        class_number: 8880,
        id: 178,
        term_id: 1199,
        exams: [],
        meetings: [
          {
            days: ['F'],
            end_date: '2019-12-03',
            end_seconds: 40800,
            is_cancelled: false,
            location: 'RCH 308',
            prof: null,
            section_id: 178,
            start_date: '2019-09-04',
            start_seconds: 37800,
          },
        ],
        section_name: 'TUT 101',
        course: {
          name: 'Logic and Computation (Enriched)',
          id: 1416,
          code: 'cs245e',
        },
      },
    },
    {
      section: {
        campus: 'UW U',
        class_number: 8881,
        id: 179,
        term_id: 1199,
        exams: [],
        meetings: [
          {
            days: ['Th', 'h'],
            end_date: '2019-11-07',
            end_seconds: 66000,
            is_cancelled: false,
            location: null,
            prof: {
              id: 1782,
              name: 'Dalibor Dvorski',
            },
            section_id: 179,
            start_date: '2019-11-07',
            start_seconds: 59400,
          },
        ],
        section_name: 'TST 201',
        course: {
          name: 'Logic and Computation (Enriched)',
          id: 1416,
          code: 'cs245e',
        },
      },
    },
    {
      section: {
        campus: 'UW U',
        class_number: 8879,
        id: 177,
        term_id: 1199,
        exams: [
          {
            date: '2019-12-17',
            day: 'T',
            location: 'MC 1056',
            start_seconds: 45000,
            end_seconds: 54000,
          },
        ],
        meetings: [
          {
            days: ['T', 'Th', 'h'],
            end_date: '2019-12-03',
            end_seconds: 51600,
            is_cancelled: false,
            location: 'ML 349',
            prof: {
              id: 3743,
              name: 'Jonathan Buss',
            },
            section_id: 177,
            start_date: '2019-09-04',
            start_seconds: 46800,
          },
        ],
        section_name: 'LEC 001',
        course: {
          name: 'Logic and Computation (Enriched)',
          id: 1416,
          code: 'cs245e',
        },
      },
    },
    {
      section: {
        campus: 'UW U',
        class_number: 6547,
        id: 193,
        term_id: 1199,
        exams: [
          {
            date: '2019-12-11',
            day: 'W',
            location: 'MC 1085',
            start_seconds: 70200,
            end_seconds: 79200,
          },
        ],
        meetings: [
          {
            days: ['T', 'Th', 'h'],
            end_date: '2019-12-03',
            end_seconds: 40800,
            is_cancelled: false,
            location: 'MC 4041',
            prof: {
              id: 1149,
              name: 'Bradley Michael Lushman',
            },
            section_id: 193,
            start_date: '2019-09-04',
            start_seconds: 36000,
          },
        ],
        section_name: 'LEC 001',
        course: {
          name: 'Object-Oriented Software Development (Enriched)',
          id: 1418,
          code: 'cs246e',
        },
      },
    },
    {
      section: {
        campus: 'UW U',
        class_number: 6548,
        id: 194,
        term_id: 1199,
        exams: [],
        meetings: [
          {
            days: ['W'],
            end_date: '2019-12-03',
            end_seconds: 48000,
            is_cancelled: false,
            location: 'MC 4060',
            prof: null,
            section_id: 194,
            start_date: '2019-09-04',
            start_seconds: 45000,
          },
        ],
        section_name: 'TUT 101',
        course: {
          name: 'Object-Oriented Software Development (Enriched)',
          id: 1418,
          code: 'cs246e',
        },
      },
    },
    {
      section: {
        campus: 'UW U',
        class_number: 6549,
        id: 195,
        term_id: 1199,
        exams: [],
        meetings: [
          {
            days: ['Th', 'h'],
            end_date: '2019-10-31',
            end_seconds: 66000,
            is_cancelled: false,
            location: null,
            prof: {
              id: 5522,
              name: 'Olga Zorin',
            },
            section_id: 195,
            start_date: '2019-10-31',
            start_seconds: 59400,
          },
        ],
        section_name: 'TST 201',
        course: {
          name: 'Object-Oriented Software Development (Enriched)',
          id: 1418,
          code: 'cs246e',
        },
      },
    },
    {
      section: {
        campus: 'UW U',
        class_number: 6170,
        id: 784,
        term_id: 1199,
        exams: [
          {
            date: '2019-12-20',
            day: 'F',
            location: 'MC 4021',
            start_seconds: 57600,
            end_seconds: 66600,
          },
        ],
        meetings: [
          {
            days: ['T', 'Th', 'h'],
            end_date: '2019-12-03',
            end_seconds: 57000,
            is_cancelled: false,
            location: 'DWE 2527',
            prof: {
              id: 933,
              name: 'Aukosh Jagannath',
            },
            section_id: 784,
            start_date: '2019-09-04',
            start_seconds: 52200,
          },
        ],
        section_name: 'LEC 001',
        course: {
          name: 'Probability (Advanced Level)',
          id: 7112,
          code: 'stat240',
        },
      },
    },
    {
      section: {
        campus: 'UW U',
        class_number: 6171,
        id: 785,
        term_id: 1199,
        exams: [],
        meetings: [
          {
            days: ['Th', 'h'],
            end_date: '2019-10-03',
            end_seconds: 66000,
            is_cancelled: false,
            location: null,
            prof: {
              id: 933,
              name: 'Aukosh Jagannath',
            },
            section_id: 785,
            start_date: '2019-10-03',
            start_seconds: 59400,
          },
          {
            days: ['Th', 'h'],
            end_date: '2019-11-14',
            end_seconds: 66000,
            is_cancelled: false,
            location: null,
            prof: null,
            section_id: 785,
            start_date: '2019-11-14',
            start_seconds: 59400,
          },
        ],
        section_name: 'TST 101',
        course: {
          name: 'Probability (Advanced Level)',
          id: 7112,
          code: 'stat240',
        },
      },
    },
  ],
};

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  isBrowserDesktop: getIsBrowserDesktop(state),
});

const ProfilePageContent = ({
  user,
  reviews,
  coursesTaken,
  isBrowserDesktop,
}) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);

  const shortlist = user.shortlist;
  const reviewModalCourseList = coursesTaken.map(course => {
    const curReview = reviews.find(
      review => review.course_id === course.course.id,
    );
    return { course: course.course, review: curReview };
  });

  return (
    <>
      <ProfileInfoHeader user={user} />
      <ColumnWrapper>
        <Column1>
          <ProfileCalendar schedule={testSchedule.schedule} />
          <ProfileCourses
            courses={coursesTaken}
            reviews={reviews}
            setReviewCourse={setSelectedCourseIndex}
            openModal={() => setReviewModalOpen(true)}
          />
          <ProfileFinalExams courses={coursesTaken} />
        </Column1>
        <Column2>
          {isBrowserDesktop && (
            <CompleteProfileWrapper>
              <CompleteProfileContent
                user={user}
                coursesTaken={coursesTaken}
                reviews={reviews}
              />
            </CompleteProfileWrapper>
          )}
          <ShortlistBox shortlistCourses={shortlist} />
        </Column2>
      </ColumnWrapper>
      <Modal
        isOpen={reviewModalOpen}
        onRequestClose={() => setReviewModalOpen(false)}
      >
        <CourseReviewCourseBox
          showCourseDropdown
          courseList={reviewModalCourseList}
          selectedCourseIndex={selectedCourseIndex}
          setSelectedCourseIndex={setSelectedCourseIndex}
          onCancel={() => setReviewModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export const ProfilePage = ({ history, isLoggedIn, isBrowserDesktop }) => {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(history.location.search);
  const firstTimeLogin = urlParams.get('firstTimeLogin') === 'true';

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: localStorage.getItem('user_id') },
  });

  if (data && data.user.length === 0) {
    logOut(dispatch);
  }

  if (!isLoggedIn) {
    history.push(LANDING_PAGE_ROUTE);
  }
  return loading ? (
    <ProfilePageWrapper>
      <LoadingSpinner />
    </ProfilePageWrapper>
  ) : error || !data ? (
    <NotFoundPage />
  ) : firstTimeLogin ? (
    <FirstTimeLoginFlow />
  ) : (
    <ProfilePageWrapper>
      <ProfilePageContent
        user={data.user[0]}
        reviews={data.review}
        coursesTaken={data.user_course_taken}
        isBrowserDesktop={isBrowserDesktop}
        firstTimeLogin={firstTimeLogin}
      />
    </ProfilePageWrapper>
  );
};

export default withRouter(connect(mapStateToProps)(ProfilePage));
