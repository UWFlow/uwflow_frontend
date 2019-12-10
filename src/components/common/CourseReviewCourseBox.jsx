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
import Modal from '../display/Modal';

/* Utils */
import { splitCourseCode } from '../../utils/Misc';

/* GraphQL */
import { DELETE_REVIEW, UPSERT_REVIEW } from '../../graphql/mutations/Review';
import { REFETCH_RATINGS } from '../../graphql/queries/course/Course';

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
  selectedCourseIndex = 0,
  showCourseDropdown = false,
  cancelButton = true,
  setSelectedCourseIndex = () => {},
  onCancel = () => {},
}) => {
  const userID = localStorage.getItem('user_id');
  const { course, review } = courseList[selectedCourseIndex];
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

  /* State */
  const [deleteReviewModalOpen, setDeleteReviewModalOpen] = useState(false);
  const [reviewUpdating, setReviewUpdating] = useState(false);
  const [reviewDeleting, setReviewDeleting] = useState(false);

  const [liked, setLiked] = useState(
    review ? (review.liked !== null ? 1 - review.liked : -1) : -1,
  );
  const [selectedAnonymous, setSelectedAnonymous] = useState(
    review && review.public ? 1 : 0,
  );

  const [useful, setUseful] = useState((review && review.course_useful) || -1);
  const [usefulSelected, setUsefulSelected] = useState(
    review ? review.course_useful !== null : false,
  );
  const [easy, setEasy] = useState((review && review.course_easy) || -1);
  const [easySelected, setEasySelected] = useState(
    review ? review.course_easy !== null : false,
  );
  const [courseComment, setCourseComment] = useState(
    (review && review.course_comment) || '',
  );

  const [selectedProf, setSelectedProf] = useState(profIndex);
  const [clear, setClear] = useState((review && review.prof_clear) || -1);
  const [clearSelected, setClearSelected] = useState(
    review ? review.prof_clear !== null : false,
  );
  const [engaging, setEngaging] = useState(
    (review && review.prof_engaging) || -1,
  );
  const [engagingSelected, setEngagingSelected] = useState(
    review ? review.prof_engaging !== null : false,
  );
  const [profComment, setProfComment] = useState(
    (review && review.prof_comment) || '',
  );

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

  const notifyDelete = () =>
    toast(`Deleted review for ${splitCourseCode(course.code)}`);
  const notifyInsert = () =>
    toast(`Created review for ${splitCourseCode(course.code)}`);
  const notifyUpdate = () =>
    toast(`Updated review for ${splitCourseCode(course.code)}`);

  const handlePost = () => {
    setReviewUpdating(true);
    const profID =
      selectedProf === -1 ? null : profsTeaching[selectedProf].prof.id;

    const reviewData = {
      user_id: userID,
      course_id: course.id,
      prof_id: profID,
      liked: 1 - liked,
      public: selectedAnonymous === 0 ? false : true,
      course_easy: easy,
      course_useful: useful,
      course_comment: courseComment,
      prof_clear: clear === -1 ? null : clear,
      prof_engaging: engaging === -1 ? null : engaging,
      prof_comment: profComment,
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
        onCancel();
        setReviewDeleting(false);
      });
    } else {
      onCancel();
    }
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
              splitCourseCode(courseObject.course.code),
            )}
            color={theme.courses}
            onChange={value => setSelectedCourseIndex(value)}
            zIndex={6}
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
          onUpdate={value => setUseful(value[0])}
          selected={usefulSelected}
          setSelected={setUsefulSelected}
        />
        <SliderOptionText>{usefulOptions[useful]}</SliderOptionText>
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Easy?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={easy}
          color={theme.courses}
          onUpdate={value => setEasy(value[0])}
          selected={easySelected}
          setSelected={setEasySelected}
        />
        <SliderOptionText>{easyOptions[easy]}</SliderOptionText>
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText width={112 - 16}>Like it?</MetricQuestionText>
        <RadioButton
          selected={liked}
          options={['Yes', 'No']}
          color={theme.courses}
          onClick={value => setLiked(value)}
        />
      </MetricQuestionWrapper>

      <ReviewTextArea
        rows={5}
        value={courseComment}
        maxLength={8192}
        onChange={event => setCourseComment(event.target.value)}
        placeholder="Add any comments or tips..."
      />

      <QuestionWrapper>
        <QuestionText>Rate your professor: </QuestionText>
        <DropdownList
          selectedIndex={selectedProf}
          placeholder="select your professor"
          options={profsTeaching.map(prof => prof.prof.name)}
          color={theme.professors}
          onChange={value => setSelectedProf(value)}
          zIndex={5}
        />
      </QuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Clear?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={clear}
          color={theme.professors}
          onUpdate={value => setClear(value[0])}
          selected={clearSelected}
          setSelected={setClearSelected}
        />
        <SliderOptionText>{clearOptions[clear]}</SliderOptionText>
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Engaging?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={engaging}
          color={theme.professors}
          onUpdate={value => setEngaging(value[0])}
          selected={engagingSelected}
          setSelected={setEngagingSelected}
        />
        <SliderOptionText>{engagingOptions[engaging]}</SliderOptionText>
      </MetricQuestionWrapper>

      <ReviewTextArea
        rows={5}
        value={profComment}
        maxLength={8192}
        onChange={event => setProfComment(event.target.value)}
        placeholder="Add any comments or tips..."
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
            onChange={value => setSelectedAnonymous(value)}
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
            handleClick={handlePost}
            loading={reviewUpdating}
            disabled={
              !usefulSelected ||
              !easySelected ||
              liked === -1 ||
              selectedProf === -1
            }
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
