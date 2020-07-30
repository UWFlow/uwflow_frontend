import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import Collapsible from 'react-collapsible';
import { Trash2 } from 'react-feather';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useTheme } from 'styled-components';

import Button from 'components/input/Button';
import DiscreteSlider from 'components/input/DiscreteSlider';
import DropdownList from 'components/input/DropdownList';
import RadioButton from 'components/input/RadioButton';
import Modal from 'components/modal/Modal';
import { REVIEW_SUCCESS } from 'constants/Messages';
import { DELETE_REVIEW, UPSERT_REVIEW } from 'graphql/mutations/Review';
import {
  REFETCH_COURSE_REVIEWS,
  REFETCH_RATINGS,
} from 'graphql/queries/course/Course';
import {
  COURSE_REVIEW_PROFS,
  COURSE_REVIEWS_WITH_USER_DATA,
} from 'graphql/queries/course/CourseReview';
import { REFETCH_USER_REVIEW } from 'graphql/queries/user/User';
import { getUserId } from 'utils/Auth';
import { formatCourseCode } from 'utils/Misc';

import {
  CourseReviewCourseBoxWrapper,
  DeleteConfirmButtons,
  DeleteIconWrapper,
  DeleteReviewModalWrapper,
  Footer,
  FooterQuestionWrapper,
  LightText,
  MetricQuestionText,
  MetricQuestionWrapper,
  QuestionText,
  QuestionWrapper,
  ReviewTextArea,
  SliderOptionText,
} from './styles/CourseReviewCourseBox';

const easyOptions = [
  'Difficult',
  'Somewhat difficult',
  'Neutral',
  'Somewhat easy',
  'Easy',
];

const usefulOptions = [
  'Useless',
  'Somewhat useless',
  'Neutral',
  'Somewhat useful',
  'Useful',
];

const clearOptions = [
  'Unclear',
  'Somewhat unclear',
  'Neutral',
  'Somewhat clear',
  'Clear',
];

const engagingOptions = [
  'Unengaging',
  'Somewhat unengaging',
  'Neutral',
  'Somewhat engaging',
  'Engaging',
];

const mergeInNewProfsTeaching = (currProfsTeaching, newProfsTeaching) => {
  const currIDs = currProfsTeaching.map((prof) => prof.prof.id);
  if (newProfsTeaching) {
    newProfsTeaching.forEach((prof) => {
      if (!currIDs.includes(prof.prof.id)) {
        currProfsTeaching.push(prof);
      }
    });
  }
};

const getProfIndex = (review, profsTeaching) =>
  review
    ? profsTeaching.findIndex(
        (prof) => prof.prof && prof.prof.id === review.prof_id,
      )
    : -1;

const CourseReviewCourseBoxContent = ({
  courseList,
  initialSelectedCourseIndex = 0,
  showCourseDropdown = false,
  cancelButton = true,
  onCancel = () => {},
  profsTeachingByCourseID,
}) => {
  const theme = useTheme();

  const [selectedCourseIndex, setSelectedCourseIndex] = useState(
    initialSelectedCourseIndex,
  );

  useEffect(() => {
    setSelectedCourseIndex(initialSelectedCourseIndex);
  }, [initialSelectedCourseIndex]);

  const buildDefaultReview = (course, review) => {
    // We need to merge profs currently teaching the course and previous profs for the course with a review
    let profsTeaching = course.profs_teaching;

    if (profsTeachingByCourseID) {
      mergeInNewProfsTeaching(
        profsTeaching,
        profsTeachingByCourseID[course.id],
      );
    }

    profsTeaching = profsTeaching.filter((prof) => prof.prof !== null);
    // add prof to dropdown if not fetched from backend
    if (review) {
      const profExists = profsTeaching.some(
        (prof) => prof.prof && prof.prof.id === review.prof_id,
      );
      if (!profExists && review.prof_id !== null) {
        profsTeaching.push({ prof: review.prof });
      }
    }

    profsTeaching = profsTeaching.sort((a, b) =>
      a.prof.name.localeCompare(b.prof.name),
    );

    const profIndex = getProfIndex(review, profsTeaching);

    return {
      id: course.id,
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
  const [lastRenderProfsTeaching, setLastRenderProfsTeaching] = useState(
    profsTeachingByCourseID,
  );

  const userID = getUserId();
  const { course, review } = courseList[selectedCourseIndex];

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

  /* Effects */
  useEffect(() => {
    // update state if profsTeaching changes
    if (!_.isEqual(profsTeachingByCourseID, lastRenderProfsTeaching)) {
      const newReviewStates = _.cloneDeep(reviewStates);
      Object.keys(reviewStates).forEach((code) => {
        mergeInNewProfsTeaching(
          newReviewStates[code].profsTeaching,
          profsTeachingByCourseID[reviewStates[code].id],
        );
        newReviewStates[code].profsTeaching = newReviewStates[
          code
        ].profsTeaching.sort((a, b) => a.prof.name.localeCompare(b.prof.name));
        newReviewStates[code].selectedProf = getProfIndex(
          review,
          newReviewStates[code].profsTeaching,
        );
      });
      setLastRenderProfsTeaching(profsTeachingByCourseID);
      setReviewStates(newReviewStates);
    }
  }, [profsTeachingByCourseID, reviewStates, lastRenderProfsTeaching, review]);

  /* Mutations */
  const refetchQueries = [
    {
      query: REFETCH_RATINGS,
      variables: {
        course_id: course.id,
        prof_id: review ? review.prof_id : null,
      },
    },
    {
      query: REFETCH_COURSE_REVIEWS,
      variables: {
        code: course.code,
        user_id: userID,
      },
    },
    {
      query: COURSE_REVIEWS_WITH_USER_DATA,
      variables: {
        id: course.id,
      },
    },
    {
      query: REFETCH_USER_REVIEW,
      variables: {
        id: userID,
      },
    },
  ];

  const [upsertReview] = useMutation(UPSERT_REVIEW, {
    refetchQueries,
    awaitRefetchQueries: true,
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries,
    awaitRefetchQueries: true,
  });

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
      public: selectedAnonymous !== 0,
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
          returning: [
            {
              __typename: 'review',
              id: review ? review.id : null,
              ...reviewData,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
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
            options={courseList.map((courseObj) =>
              formatCourseCode(courseObj.course.code),
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
          numNodes={5}
          currentNode={useful}
          color={theme.courses}
          onSlideEnd={(value) =>
            setSliderValue('useful', value[0], 'usefulSelected')
          }
          selected={usefulSelected}
          setSelected={(value) => setReviewValue('usefulSelected', value)}
        />
        <SliderOptionText>
          {usefulSelected ? usefulOptions[useful] : ''}
        </SliderOptionText>
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Easy?</MetricQuestionText>
        <DiscreteSlider
          numNodes={5}
          currentNode={easy}
          color={theme.courses}
          onSlideEnd={(value) =>
            setSliderValue('easy', value[0], 'easySelected')
          }
          selected={easySelected}
          setSelected={(value) => setReviewValue('easySelected', value)}
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
          onClick={(value) => setReviewValue('liked', value)}
        />
      </MetricQuestionWrapper>

      <ReviewTextArea
        rows={5}
        value={courseComment}
        maxLength={8192}
        onChange={(event) =>
          setReviewValue('courseComment', event.target.value)
        }
        placeholder="Add any comments or tips..."
      />

      <QuestionWrapper>
        <QuestionText>Rate your professor: </QuestionText>
        <DropdownList
          selectedIndex={selectedProf}
          placeholder="select your professor"
          options={[
            ...profsTeaching
              .sort((a, b) => a.prof.name.localeCompare(b.prof.name))
              .map((prof) => prof.prof.name),
            "my professor isn't here",
          ]}
          color={theme.professors}
          onChange={(value) => setReviewValue('selectedProf', value)}
          zIndex={5}
          searchable
        />
      </QuestionWrapper>

      <Collapsible
        open={selectedProf !== -1 && selectedProf !== profsTeaching.length}
        transitionTime={200}
        easing="ease-in-out"
        overflowWhenOpen="visible"
      >
        <MetricQuestionWrapper>
          <MetricQuestionText>Clear?</MetricQuestionText>
          <DiscreteSlider
            numNodes={5}
            currentNode={clear}
            color={theme.professors}
            onSlideEnd={(value) =>
              setSliderValue('clear', value[0], 'clearSelected')
            }
            selected={clearSelected}
            setSelected={(value) => setReviewValue('clearSelected', value)}
            disabled={profID === null}
          />
          <SliderOptionText>
            {clearSelected && profID !== null ? clearOptions[clear] : ''}
          </SliderOptionText>
        </MetricQuestionWrapper>

        <MetricQuestionWrapper>
          <MetricQuestionText>Engaging?</MetricQuestionText>
          <DiscreteSlider
            numNodes={5}
            currentNode={engaging}
            color={theme.professors}
            onSlideEnd={(value) =>
              setSliderValue('engaging', value[0], 'engagingSelected')
            }
            selected={engagingSelected}
            setSelected={(value) => setReviewValue('engagingSelected', value)}
            disabled={profID === null}
          />
          <SliderOptionText>
            {engagingSelected && profID !== null
              ? engagingOptions[engaging]
              : ''}
          </SliderOptionText>
        </MetricQuestionWrapper>

        <ReviewTextArea
          rows={5}
          value={profComment}
          maxLength={8192}
          onChange={(event) =>
            setReviewValue('profComment', event.target.value)
          }
          placeholder="Add any comments or tips..."
          disabled={profID === null}
        />
      </Collapsible>

      <Footer>
        <DeleteIconWrapper onMouseDown={(e) => e.preventDefault()}>
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
            onChange={(value) => setReviewValue('selectedAnonymous', value)}
            margin="auto 16px auto auto"
            zIndex={2}
          />
          {cancelButton && (
            <Button
              color={theme.dark3}
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
              margin="auto 16px auto 0"
              width="120px"
              handleClick={() => setDeleteReviewModalOpen(false)}
            >
              <LightText>Cancel</LightText>
            </Button>
            <Button
              color={theme.red}
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

const CourseReviewCourseBox = ({ courseList, ...props }) => {
  const courseIDs = courseList.map((course) => course.course.id);
  const { data } = useQuery(COURSE_REVIEW_PROFS, {
    variables: { id: courseIDs },
  });
  const profsSeenByCourseID = {};
  const profsTeachingByCourseID = data
    ? data.review.reduce((profs, currentProf) => {
        if (
          currentProf &&
          currentProf.prof &&
          (!profsSeenByCourseID[currentProf.course_id] ||
            !profsSeenByCourseID[currentProf.course_id][currentProf.prof.code])
        ) {
          if (!profs[currentProf.course_id]) {
            profs[currentProf.course_id] = [];
          }
          profs[currentProf.course_id].push({ prof: currentProf.prof });
          if (!profsSeenByCourseID[currentProf.course_id]) {
            profsSeenByCourseID[currentProf.course_id] = {};
          }
          profsSeenByCourseID[currentProf.course_id][
            currentProf.prof.code
          ] = true;
        }
        return profs;
      }, {})
    : null;

  return (
    <CourseReviewCourseBoxContent
      {...{
        ...props,
        profsTeachingByCourseID,
        courseList,
      }}
    />
  );
};

export default CourseReviewCourseBox;
