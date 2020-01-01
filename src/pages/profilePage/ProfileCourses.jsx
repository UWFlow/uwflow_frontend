import React from 'react';
import PropTypes from 'prop-types';
import { PlusSquare, Edit } from 'react-feather';
import { withTheme } from 'styled-components';

/* Child Components */
import TabContainer from '../../components/display/TabContainer';
import Button from '../../components/input/Button';
import LikeCourseToggle from '../../components/input/LikeCourseToggle';

/* Styled Components */
import {
  ProfileCoursesWrapper,
  ProfileCoursesCourse,
  ProfileCourseText,
  ProfileCourseCode,
  ProfileCourseName,
  ProfileCourseLiked,
  LikedThisCourseText,
  AddReviewIcon,
  ProfileCourseReviewButtonText,
  ReviewButtonContents,
  LikeToggleWrapper,
  LikedCourseWrapper,
  YourCoursesWrapper,
  HeaderText,
} from './styles/ProfileCourses';

/* Routes */
import { getCoursePageRoute } from '../../Routes';

/* Utils */
import {
  termCodeToDate,
  formatCourseCode,
  processRating,
} from '../../utils/Misc';
import withModal from '../../components/modal/withModal';
import { TRANSCRIPT_UPLOAD_MODAL } from '../../constants/Modal';

const ProfileCourses = ({
  theme,
  courses,
  reviews,
  setReviewCourse,
  openModal,
  openReviewModal,
  refetchAll,
}) => {
  const groupByTerm = courses => {
    return courses.reduce((groups, course, idx) => {
      groups[course.term_id] = groups[course.term_id] || [];
      groups[course.term_id].push({ ...course, index: idx });
      return groups;
    }, {});
  };

  const unorderedGroups = groupByTerm(courses);
  const courseGroups = {};

  // sort terms by date
  Object.keys(unorderedGroups)
    .sort()
    .reverse()
    .forEach(term => {
      courseGroups[termCodeToDate(term)] = unorderedGroups[term];
    });

  const tabContent = termName =>
    courseGroups[termName].map((course_taken, idx) => {
      const review = reviews.find(r => r.course_id === course_taken.course_id);

      return (
        <ProfileCoursesCourse key={idx}>
          <ProfileCourseText>
            <ProfileCourseCode
              to={getCoursePageRoute(course_taken.course.code)}
            >
              {formatCourseCode(course_taken.course.code)}
            </ProfileCourseCode>
            <ProfileCourseName>{course_taken.course.name}</ProfileCourseName>
          </ProfileCourseText>
          <LikedCourseWrapper>
            <ProfileCourseLiked>
              {processRating(course_taken.course.rating.liked)}
            </ProfileCourseLiked>
            <LikedThisCourseText>
              liked this
              <br />
              course
            </LikedThisCourseText>
          </LikedCourseWrapper>
          <LikeToggleWrapper>
            <LikeCourseToggle
              key={course_taken.index}
              courseID={course_taken.course.id}
              profID={review ? review.prof_id : null}
              reviewID={review ? review.id : null}
              initialState={review ? review.liked : null}
            />
          </LikeToggleWrapper>
          <Button
            margin="auto 0 auto 16px"
            padding="8px"
            height={48}
            maxHeight={48}
            handleClick={() => {
              setReviewCourse(course_taken.index);
              openReviewModal();
            }}
          >
            <ReviewButtonContents>
              <AddReviewIcon>
                {review ? (
                  <Edit color={theme.dark2} size={20} strokeWidth={2} />
                ) : (
                  <PlusSquare color={theme.dark2} size={20} strokeWidth={2} />
                )}
              </AddReviewIcon>
              <ProfileCourseReviewButtonText>
                {review ? 'Edit review' : 'Add review'}
              </ProfileCourseReviewButtonText>
            </ReviewButtonContents>
          </Button>
        </ProfileCoursesCourse>
      );
    });

  const tabList = Object.keys(courseGroups).map(termName => {
    return {
      title: termName,
      render: () => tabContent(termName),
    };
  });

  const transcriptModalProps = {
    onAfterUploadSuccess: refetchAll,
  };

  return tabList.length > 0 ? (
    <ProfileCoursesWrapper>
      <YourCoursesWrapper columnBreak={425}>
        <HeaderText columnBreak={425}>Your courses</HeaderText>
        <Button
          handleClick={() =>
            openModal(TRANSCRIPT_UPLOAD_MODAL, transcriptModalProps)
          }
          padding="8px 24px"
        >
          Add previous terms
        </Button>
      </YourCoursesWrapper>
      <TabContainer tabList={tabList} contentPadding="0" minTabWidth={144} />
    </ProfileCoursesWrapper>
  ) : (
    <ProfileCoursesWrapper>
      <YourCoursesWrapper columnBreak={1120}>
        <HeaderText columnBreak={1120}>Add courses you have taken</HeaderText>
        <Button
          handleClick={() =>
            openModal(TRANSCRIPT_UPLOAD_MODAL, transcriptModalProps)
          }
          padding="8px 24px"
        >
          Add previous terms
        </Button>
      </YourCoursesWrapper>
    </ProfileCoursesWrapper>
  );
};

ProfileCourses.propTypes = {
  theme: PropTypes.object.isRequired,
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  setReviewCourse: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default withModal(withTheme(ProfileCourses));
