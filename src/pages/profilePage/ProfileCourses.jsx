import React from 'react';
import { Edit, PlusSquare } from 'react-feather';
import PropTypes from 'prop-types';
import { getCoursePageRoute } from 'Routes';
import { withTheme } from 'styled-components';

import TabContainer from 'components/display/TabContainer';
import Button from 'components/input/Button';
import LikeCourseToggle from 'components/input/LikeCourseToggle';
import withModal from 'components/modal/withModal';
import {
  COURSE_REVIEW_COURSE_MODAL,
  TRANSCRIPT_UPLOAD_MODAL,
} from 'constants/Modal';
import { formatCourseCode, processRating, termCodeToDate } from 'utils/Misc';

import {
  AddReviewIcon,
  HeaderText,
  LikedCourseWrapper,
  LikedThisCourseText,
  LikeToggleWrapper,
  ProfileCourseCode,
  ProfileCourseLiked,
  ProfileCourseName,
  ProfileCourseReviewButtonText,
  ProfileCoursesCourse,
  ProfileCoursesWrapper,
  ProfileCourseText,
  ReviewButtonContents,
  YourCoursesWrapper,
} from './styles/ProfileCourses';

const ProfileCourses = ({
  theme,
  courses,
  reviewModalCourseList,
  reviews,
  openModal,
  closeModal,
  refetchAll,
}) => {
  const groupCoursesByTerm = () => {
    return courses.reduce((groups, course, idx) => {
      groups[course.term_id] = groups[course.term_id] || [];
      groups[course.term_id].push({ ...course, index: idx });
      return groups;
    }, {});
  };

  const unorderedGroups = groupCoursesByTerm(courses);
  const courseGroups = {};
  const reviewModalProps = {
    showCourseDropdown: true,
    courseList: reviewModalCourseList,
    onCancel: () => closeModal(COURSE_REVIEW_COURSE_MODAL),
  };

  // sort terms by date
  Object.keys(unorderedGroups)
    .sort()
    .reverse()
    .forEach((term) => {
      courseGroups[termCodeToDate(term)] = unorderedGroups[term];
    });

  const sortedCourseList = reviewModalCourseList.sort((a, b) =>
    a.course.code.localeCompare(b.course.code),
  );
  const tabContent = (termName) =>
    courseGroups[termName].map((courseTaken) => {
      const review = reviews.find((r) => r.course_id === courseTaken.course_id);
      const selectedIndex = sortedCourseList.findIndex(
        (courseObj) => courseObj.course.id === courseTaken.course.id,
      );

      return (
        <ProfileCoursesCourse key={courseTaken.course.id}>
          <ProfileCourseText>
            <ProfileCourseCode to={getCoursePageRoute(courseTaken.course.code)}>
              {formatCourseCode(courseTaken.course.code)}
            </ProfileCourseCode>
            <ProfileCourseName>{courseTaken.course.name}</ProfileCourseName>
          </ProfileCourseText>
          <LikedCourseWrapper>
            <ProfileCourseLiked>
              {processRating(courseTaken.course.rating.liked)}
            </ProfileCourseLiked>
            <LikedThisCourseText>
              liked this
              <br />
              course
            </LikedThisCourseText>
          </LikedCourseWrapper>
          <LikeToggleWrapper>
            <LikeCourseToggle
              key={courseTaken.course.id}
              courseID={courseTaken.course.id}
              courseCode={courseTaken.course.code}
              profID={review ? review.prof_id : null}
              reviewID={review ? review.id : null}
              initialState={review ? review.liked : null}
            />
          </LikeToggleWrapper>
          <Button
            key={courseTaken.course.id}
            margin="auto 0 auto 16px"
            padding="8px"
            height={48}
            maxHeight={'48px'}
            handleClick={() => {
              openModal(COURSE_REVIEW_COURSE_MODAL, {
                ...reviewModalProps,
                initialSelectedCourseIndex: selectedIndex,
              });
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

  const tabList = Object.keys(courseGroups).map((termName) => {
    return {
      title: termName,
      render: () => tabContent(termName),
      onClick: () => null,
    };
  });

  const transcriptModalProps = {
    onAfterUploadSuccess: refetchAll,
    onSkip: () => closeModal(TRANSCRIPT_UPLOAD_MODAL),
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
  openModal: PropTypes.func.isRequired,
};

export default withModal(withTheme(ProfileCourses));
