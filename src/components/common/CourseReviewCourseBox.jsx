import React, { useState } from 'react';
import { Trash2 } from 'react-feather';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';

import {
  CourseReviewCourseBoxWrapper,
  QuestionText,
  MetricQuestionWrapper,
  MetricQuestionText,
  ReviewTextArea,
  QuestionWrapper,
  Footer,
  DeleteIconWrapper,
  LightText,
  FooterQuestionWrapper,
  SliderOptionText,
  DeleteReviewModalWrapper,
  DeleteConfirmButtons,
} from './styles/CourseReviewCourseBox';

/* Child Components */
import RadioButton from '../input/RadioButton';
import DropdownList from '../input/DropdownList';
import Button from '../input/Button';
import DiscreteSlider from '../input/DiscreteSlider';
import Modal from '../modal/Modal';

/* Utils */
import { formatCourseCode } from '../../utils/Misc';

/* GraphQL */
import { DELETE_REVIEW, UPSERT_REVIEW } from '../../graphql/mutations/Review';
import { REFETCH_RATINGS } from '../../graphql/queries/course/Course';

/* Constants */
import { REVIEW_SUCCESS } from '../../constants/Messages';

const easyOptions = [
  'Very difficult',
  'Difficult',
  'Somewhat difficult',
  'Somewhat easy',
  'Easy',
  'Very easy',
];

const usefulOptions = [
  'Very useless',
  'Useless',
  'Somewhat useless',
  'Somewhat useful',
  'Useful',
  'Very useful',
];

const clearOptions = [
  'Very unclear',
  'Unclear',
  'Somewhat unclear',
  'Somewhat clear',
  'Clear',
  'Very clear',
];

const engagingOptions = [
  'Very unengaging',
  'Unengaging',
  'Somewhat unengaging',
  'Somewhat engaging',
  'Engaging',
  'Very engaging',
];

const CourseReviewCourseBox = ({
  theme,
  courseList,
  initialSelectedCourseIndex = 0,
  showCourseDropdown = false,
  cancelButton = true,
  onCancel = () => {},
}) => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(
    initialSelectedCourseIndex,
  );
  const buildDefaultReview = (course, review) => {
    let profsTeaching = course.profs_teaching;
    profsTeaching = profsTeaching.filter(prof => prof.prof !== null);

    // add prof to dropdown if not fetched from backend
    if (review) {
      let idx = profsTeaching.findIndex(
        prof => prof.prof && prof.prof.id === review.prof_id,
      );
      if (idx === -1 && review.prof_id !== null) {
        profsTeaching.push({ prof: review.prof });
      }
    }

    const profIndex = review
      ? profsTeaching.findIndex(
          prof => prof.prof && prof.prof.id === review.prof_id,
        )
      : -1;

    return {
      liked: review ? (review.liked !== null ? 1 - review.liked : -1) : -1,
      useful: (review && review.course_useful) || 0,
      usefulSelected: review ? review.course_useful !== null : false,
      easy: (review && review.course_easy) || 0,
      easySelected: review ? review.course_easy !== null : false,
      courseComment: (review && review.course_comment) || '',
      selectedProf: profIndex,
      clear: (review && review.prof_clear) || 0,
      clearSelected: review ? review.prof_clear !== null : false,
      engaging: (review && review.prof_engaging) || 0,
      engagingSelected: review ? review.prof_engaging !== null : false,
      profComment: (review && review.prof_comment) || '',
      selectedAnonymous: review && review.public ? 1 : 0,
      profsTeaching,
    };
  };

  const userID = localStorage.getItem('user_id');
  const { course, review } = courseList[selectedCourseIndex];

  /* State */
  const [deleteReviewModalOpen, setDeleteReviewModalOpen] = useState(false);
  const [reviewUpdating, setReviewUpdating] = useState(false);
  const [reviewDeleting, setReviewDeleting] = useState(false);
  const [reviewStates, setReviewStates] = useState(
    courseList.reduce((states, { course, review }) => {
      states[course.code] = buildDefaultReview(course, review);
      return states;
    }, {}),
  );

  const {
    liked,
    useful,
    usefulSelected,
    easy,
    easySelected,
    courseComment,
    selectedProf,
    clear,
    clearSelected,
    engaging,
    engagingSelected,
    profComment,
    selectedAnonymous,
    profsTeaching,
  } = reviewStates[course.code];

  /* Mutations */
  const refetchQueries = [
    {
      query: REFETCH_RATINGS,
      variables: {
        course_id: course.id,
        user_id: userID,
        prof_id: review ? review.prof_id : null,
      },
    },
  ];

  const [upsertReview] = useMutation(UPSERT_REVIEW, { refetchQueries });
  const [deleteReview] = useMutation(DELETE_REVIEW, { refetchQueries });

  const notifyDelete = () => toast(REVIEW_SUCCESS.deleted);
  const notifyInsert = () => toast(REVIEW_SUCCESS.posted);
  const notifyUpdate = () => toast(REVIEW_SUCCESS.updated);

  const profID =
    selectedProf === -1 || selectedProf === profsTeaching.length
      ? null
      : profsTeaching[selectedProf].prof.id;

  const handlePost = () => {
    setReviewUpdating(true);

    const reviewData = {
      user_id: userID,
      course_id: course.id,
      prof_id: profID,
      liked: 1 - liked,
      public: selectedAnonymous === 0 ? false : true,
      course_easy: easy,
      course_useful: useful,
      course_comment: courseComment !== '' ? courseComment : null,
      prof_clear: profID && clearSelected ? clear : null,
      prof_engaging: profID && engagingSelected ? engaging : null,
      prof_comment: profID && profComment !== '' ? profComment : null,
    };

    upsertReview({
      variables: reviewData,
      optimisticResponse: {
        __typename: 'mutation_root',
        insert_review: {
          __typename: 'review_mutation_response',
          returning: {
            __typename: 'review',
            id: review ? review.id : null,
            ...reviewData,
            created_at: new Date(),
            updated_at: new Date(),
          },
        },
      },
    }).then(() => {
      if (review) {
        notifyUpdate();
      } else {
        notifyInsert();
      }
      onCancel();
      setReviewUpdating(false);
    });
  };

  const handleDelete = () => {
    if (review) {
      setReviewDeleting(true);
      deleteReview({
        variables: { review_id: review ? review.id : null },
      }).then(() => {
        notifyDelete();
        setDeleteReviewModalOpen(false);
        onCancel();
        setReviewDeleting(false);
      });
    } else {
      setDeleteReviewModalOpen(false);
      onCancel();
    }
  };

  const setReviewValue = (key, value) => {
    setReviewStates({
      ...reviewStates,
      [course.code]: {
        ...reviewStates[course.code],
        [key]: value,
      },
    });
  };

  const setSliderValue = (key, value, selectedKey) => {
    setReviewStates({
      ...reviewStates,
      [course.code]: {
        ...reviewStates[course.code],
        [key]: value,
        [selectedKey]: true,
      },
    });
  };

  return (
    <CourseReviewCourseBoxWrapper>
      {(courseList.length > 1 || showCourseDropdown) && (
        <QuestionWrapper>
          <QuestionText>Review a course: </QuestionText>
          <DropdownList
            selectedIndex={selectedCourseIndex}
            placeholder="select a course"
            options={courseList.map(courseObject =>
              formatCourseCode(courseObject.course.code),
            )}
            color={theme.courses}
            onChange={setSelectedCourseIndex}
            zIndex={6}
            searchable
          />
        </QuestionWrapper>
      )}

      <QuestionWrapper>
        <QuestionText>What do you think of this course?</QuestionText>
      </QuestionWrapper>
      <MetricQuestionWrapper>
        <MetricQuestionText>Useful?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={useful}
          color={theme.courses}
          onSlideEnd={value =>
            setSliderValue('useful', value[0], 'usefulSelected')
          }
          selected={usefulSelected}
          setSelected={value => setReviewValue('usefulSelected', value)}
        />
        <SliderOptionText>
          {usefulSelected ? usefulOptions[useful] : ''}
        </SliderOptionText>
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Easy?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={easy}
          color={theme.courses}
          onSlideEnd={value => setSliderValue('easy', value[0], 'easySelected')}
          selected={easySelected}
          setSelected={value => setReviewValue('easySelected', value)}
        />
        <SliderOptionText>
          {easySelected ? easyOptions[easy] : ''}
        </SliderOptionText>
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText width={112 - 16}>Like it?</MetricQuestionText>
        <RadioButton
          selected={liked}
          options={['Yes', 'No']}
          color={theme.courses}
          onClick={value => setReviewValue('liked', value)}
        />
      </MetricQuestionWrapper>

      <ReviewTextArea
        rows={5}
        value={courseComment}
        maxLength={8192}
        onChange={event => setReviewValue('courseComment', event.target.value)}
        placeholder="Add any comments or tips..."
      />

      <QuestionWrapper>
        <QuestionText>Rate your professor: </QuestionText>
        <DropdownList
          selectedIndex={selectedProf}
          placeholder="select your professor"
          options={[
            ...profsTeaching.map(prof => prof.prof.name),
            "my professor isn't here",
          ]}
          color={theme.professors}
          onChange={value => setReviewValue('selectedProf', value)}
          zIndex={5}
          searchable
        />
      </QuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Clear?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={clear}
          color={theme.professors}
          onSlideEnd={value =>
            setSliderValue('clear', value[0], 'clearSelected')
          }
          selected={clearSelected}
          setSelected={value => setReviewValue('clearSelected', value)}
          disabled={profID === null}
        />
        <SliderOptionText>
          {clearSelected && profID !== null ? clearOptions[clear] : ''}
        </SliderOptionText>
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Engaging?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={engaging}
          color={theme.professors}
          onSlideEnd={value =>
            setSliderValue('engaging', value[0], 'engagingSelected')
          }
          selected={engagingSelected}
          setSelected={value => setReviewValue('engagingSelected', value)}
          disabled={profID === null}
        />
        <SliderOptionText>
          {engagingSelected && profID !== null ? engagingOptions[engaging] : ''}
        </SliderOptionText>
      </MetricQuestionWrapper>

      <ReviewTextArea
        rows={5}
        value={profComment}
        maxLength={8192}
        onChange={event => setReviewValue('profComment', event.target.value)}
        placeholder="Add any comments or tips..."
        disabled={profID === null}
      />

      <Footer>
        <DeleteIconWrapper>
          <Trash2
            onClick={() => setDeleteReviewModalOpen(true)}
            color={theme.red}
          />
        </DeleteIconWrapper>
        <FooterQuestionWrapper>
          <QuestionText>Post: </QuestionText>
          <DropdownList
            selectedIndex={selectedAnonymous}
            options={['anonymously', 'as yourself']}
            color={theme.primary}
            onChange={value => setReviewValue('selectedAnonymous', value)}
            margin="auto 16px auto auto"
            zIndex={2}
          />
          {cancelButton && (
            <Button
              color={theme.dark3}
              hoverColor={theme.dark2}
              handleClick={onCancel}
              margin="auto 16px auto auto"
            >
              <LightText>Cancel</LightText>
            </Button>
          )}
          <Button
            type="submit"
            handleClick={handlePost}
            loading={reviewUpdating}
            disabled={!usefulSelected || !easySelected || liked === -1}
          >
            Post
          </Button>
        </FooterQuestionWrapper>
      </Footer>

      <Modal
        isOpen={deleteReviewModalOpen}
        onRequestClose={() => setDeleteReviewModalOpen(false)}
      >
        <DeleteReviewModalWrapper>
          Are you sure you want to delete this review?
          <DeleteConfirmButtons>
            <Button
              color={theme.dark3}
              hoverColor={theme.dark2}
              margin="auto 16px auto 0"
              width="120px"
              handleClick={() => setDeleteReviewModalOpen(false)}
            >
              <LightText>Cancel</LightText>
            </Button>
            <Button
              color={theme.red}
              hoverColor={theme.darkRed}
              loading={reviewDeleting}
              width="120px"
              handleClick={handleDelete}
            >
              <LightText>Delete</LightText>
            </Button>
          </DeleteConfirmButtons>
        </DeleteReviewModalWrapper>
      </Modal>
    </CourseReviewCourseBoxWrapper>
  );
};

CourseReviewCourseBox.propTypes = {
  courseList: PropTypes.arrayOf(
    PropTypes.shape({
      course: PropTypes.object.isRequired,
      review: PropTypes.object,
    }),
  ).isRequired,
  theme: PropTypes.object.isRequired,
  selectedCourseIndex: PropTypes.number,
  setSelectedCourseIndex: PropTypes.func,
  showCourseDropdown: PropTypes.bool,
  cancelButton: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default withTheme(CourseReviewCourseBox);
