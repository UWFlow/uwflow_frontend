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
import {
  CLEAR_OPTIONS,
  EASY_OPTIONS,
  ENGAGING_OPTIONS,
  USEFUL_OPTIONS,
} from 'constants/Review';
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
  CourseReviewBoxWrapper,
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
} from './styles/CourseReviewBox';

const mergeInNewProfsTeaching = (
  currProfsTeaching: any,
  newProfsTeaching: any,
) => {
  const currIDs = currProfsTeaching.map((prof: any) => prof.prof.id);
  if (newProfsTeaching) {
    newProfsTeaching.forEach((prof: any) => {
      if (!currIDs.includes(prof.prof.id)) {
        currProfsTeaching.push(prof);
      }
    });
  }
};

const getProfIndex = (review: any, profsTeaching: any) =>
  review
    ? profsTeaching.findIndex(
        (prof: any) => prof.prof && prof.prof.id === review.prof_id,
      )
    : -1;

type CourseReviewBoxContentProps = CourseReviewBoxProps & {
  profsTeachingByCourseId: any;
};

const CourseReviewBoxContent = ({
  courseList,
  profsTeachingByCourseId,
  initialSelectedCourseIndex = 0,
  showCourseDropdown = false,
  cancelButton = true,
  onCancel = () => {},
}: CourseReviewBoxContentProps) => {
  const theme = useTheme();

  const [selectedCourseIndex, setSelectedCourseIndex] = useState(
    initialSelectedCourseIndex,
  );

  useEffect(() => {
    setSelectedCourseIndex(initialSelectedCourseIndex);
  }, [initialSelectedCourseIndex]);

  const buildDefaultReview = (course: any, review: any) => {
    // We need to merge profs currently teaching the course and previous profs for the course with a review
    let profsTeaching = course.profs_teaching;

    if (profsTeachingByCourseId) {
      mergeInNewProfsTeaching(
        profsTeaching,
        profsTeachingByCourseId[course.id],
      );
    }

    profsTeaching = profsTeaching.filter((prof: any) => prof.prof !== null);
    // add prof to dropdown if not fetched from backend
    if (review) {
      const profExists = profsTeaching.some(
        (prof: any) => prof.prof && prof.prof.id === review.prof_id,
      );
      if (!profExists && review.prof_id !== null) {
        profsTeaching.push({ prof: review.prof });
      }
    }

    profsTeaching = profsTeaching.sort((a: any, b: any) =>
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
    profsTeachingByCourseId,
  );

  const userId = getUserId();
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
    if (!_.isEqual(profsTeachingByCourseId, lastRenderProfsTeaching)) {
      const newReviewStates = _.cloneDeep(reviewStates);
      Object.keys(reviewStates).forEach((code) => {
        mergeInNewProfsTeaching(
          newReviewStates[code].profsTeaching,
          profsTeachingByCourseId[reviewStates[code].id],
        );
        newReviewStates[code].profsTeaching = newReviewStates[
          code
        ].profsTeaching.sort((a: any, b: any) =>
          a.prof.name.localeCompare(b.prof.name),
        );
        newReviewStates[code].selectedProf = getProfIndex(
          review,
          newReviewStates[code].profsTeaching,
        );
      });
      setLastRenderProfsTeaching(profsTeachingByCourseId);
      setReviewStates(newReviewStates);
    }
  }, [profsTeachingByCourseId, reviewStates, lastRenderProfsTeaching, review]);

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
        user_id: userId,
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
        id: userId,
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

  const profId =
    selectedProf === -1 || selectedProf === profsTeaching.length
      ? null
      : profsTeaching[selectedProf].prof.id;

  const handlePost = () => {
    setReviewUpdating(true);

    const reviewData = {
      user_id: userId,
      course_id: course.id,
      prof_id: profId,
      liked: 1 - liked,
      public: selectedAnonymous !== 0,
      course_easy: easy,
      course_useful: useful,
      course_comment: courseComment !== '' ? courseComment : null,
      prof_clear: profId && clearSelected ? clear : null,
      prof_engaging: profId && engagingSelected ? engaging : null,
      prof_comment: profId && profComment !== '' ? profComment : null,
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

  const setReviewValue = (key: string, value: any) => {
    setReviewStates({
      ...reviewStates,
      [course.code]: {
        ...reviewStates[course.code],
        [key]: value,
      },
    });
  };

  const setSliderValue = (key: string, value: any, selectedKey: string) => {
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
    <CourseReviewBoxWrapper>
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
          {usefulSelected ? USEFUL_OPTIONS[useful] : ''}
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
          {easySelected ? EASY_OPTIONS[easy] : ''}
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
              .sort((a: any, b: any) => a.prof.name.localeCompare(b.prof.name))
              .map((profObf: any) => profObf.prof.name),
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
        trigger=""
        triggerDisabled={true}
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
            disabled={profId === null}
          />
          <SliderOptionText>
            {clearSelected && profId !== null ? CLEAR_OPTIONS[clear] : ''}
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
            disabled={profId === null}
          />
          <SliderOptionText>
            {engagingSelected && profId !== null
              ? ENGAGING_OPTIONS[engaging]
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
          disabled={profId === null}
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
    </CourseReviewBoxWrapper>
  );
};

type CourseReviewBoxProps = {
  courseList: any[];
  initialSelectedCourseIndex?: number;
  showCourseDropdown?: boolean;
  cancelButton?: boolean;
  onCancel?: () => void;
};

const CourseReviewBox = ({ courseList, ...props }: CourseReviewBoxProps) => {
  const courseIds = courseList.map((course) => course.course.id);
  const { data } = useQuery(COURSE_REVIEW_PROFS, {
    variables: { id: courseIds },
  });
  const profsSeenByCourseID: { [key: string]: any } = {};
  const profsTeachingByCourseId = data
    ? data.review.reduce((profs: any, currentProf: any) => {
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
    <CourseReviewBoxContent
      {...{
        ...props,
        profsTeachingByCourseId,
        courseList,
      }}
    />
  );
};

export default CourseReviewBox;
