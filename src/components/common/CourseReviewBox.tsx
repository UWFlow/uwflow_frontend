import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import Collapsible from 'react-collapsible';
import { Trash2 } from 'react-feather';
import { toast } from 'react-toastify';
import {
  CourseReviewProfsQuery,
  CourseReviewsWithUserDataQueryVariables,
  DeleteReviewMutation,
  DeleteReviewMutationVariables,
  RefetchCourseReviewsQueryVariables,
  RefetchRatingsQueryVariables,
  RefetchUserReviewQueryVariables,
  UpsertReviewMutation,
  UpsertReviewMutationVariables,
  User,
} from 'generated/graphql';
import _ from 'lodash';
import { DefaultTheme, useTheme } from 'styled-components';

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
import { DocumentNode } from 'graphql';
import { DELETE_REVIEW, UPSERT_REVIEW } from 'graphql/mutations/Review';
import {
  REFETCH_COURSE_REVIEWS,
  REFETCH_RATINGS,
} from 'graphql/queries/course/Course';
import {
  COURSE_REVIEW_PROFS,
  COURSE_REVIEWS_WITH_USER_DATA,
} from 'graphql/queries/course/CourseReview';
import { ONLY_PROF_QUERY } from 'graphql/queries/prof/Prof';
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

const filterTeachingProfs = (
  allProfs: Prof[],
  profsTeaching: ProfTeaching[],
) => {
  const teachingProfIds = new Set(
    profsTeaching.map((profObj) => profObj.prof?.id).filter(Boolean),
  );

  return allProfs.filter((prof) => !teachingProfIds.has(prof.id));
};

interface Prof {
  id: number;
  code: string;
  name: string;
}

interface ProfTeaching {
  prof: Prof;
}

interface Course {
  id: number;
  code: string;
  profs_teaching: ProfTeaching[];
  ratings: Array<{
    liked: number;
    useful: number;
    easy: number;
    count: number;
  }>;
  sections: Array<{
    id: number;
    code: string;
  }>;
  reviews: Review[];
}

interface Review {
  author: User;
  course: Course;
  course_comment: string | null;
  course_easy: number | null;
  course_id: number;
  course_useful: number | null;
  created_at: string;
  id: number;
  liked: number | null;
  prof: Prof | null;
  prof_clear: number | null;
  prof_engaging: number | null;
  prof_comment: string | null;
  public: boolean;
}

interface CourseListItem {
  course: Course;
  review: Review | null;
}

interface CourseReviewBoxProps {
  courseList: CourseListItem[];
  initialSelectedCourseIndex?: number;
  showCourseDropdown?: boolean;
  cancelButton?: boolean;
  onCancel?: () => void;
}

interface CourseReviewBoxContentProps extends CourseReviewBoxProps {
  profsTeachingByCourseId: {
    [key: string]: ProfTeaching[];
  } | null;
  allProfs: Prof[];
}

interface ReviewState {
  id: number;
  liked: number;
  useful: number;
  usefulSelected: boolean;
  easy: number;
  easySelected: boolean;
  courseComment: string;
  selectedProf: number;
  clear: number;
  clearSelected: boolean;
  engaging: number;
  engagingSelected: boolean;
  profComment: string;
  selectedAnonymous: number;
  profsTeaching: ProfTeaching[];
}

interface ReviewStates {
  [courseCode: string]: ReviewState;
}

interface Review {
  user_id: number;
  course_id: number;
  prof_id: number | null;
  liked: number | null;
  public: boolean;
  course_easy: number | null;
  course_useful: number | null;
  course_comment: string | null;
  prof_clear: number | null;
  prof_comment: string | null;
  prof_engaging: number | null;
  updated_at: string;
}

type ProfTeachingMap = {
  [key: string]: ProfTeaching[];
};

const mergeInNewProfsTeaching = (
  currProfsTeaching: ProfTeaching[],
  newProfsTeaching: ProfTeaching[] | undefined,
): void => {
  const currIDs: number[] = currProfsTeaching.map((prof) => prof.prof.id);
  if (newProfsTeaching) {
    newProfsTeaching.forEach((prof) => {
      if (!currIDs.includes(prof.prof.id)) {
        currProfsTeaching.push(prof);
      }
    });
  }
};

const getProfIndex = (
  review: Review | null,
  profsTeaching: ProfTeaching[],
): number =>
  review
    ? profsTeaching.findIndex(
        (prof) => prof.prof && prof.prof.id === review.prof_id,
      )
    : -1;

interface ProfOption {
  label: string;
  id: number | null;
}

const CourseReviewBoxContent = ({
  courseList,
  profsTeachingByCourseId,
  initialSelectedCourseIndex = 0,
  showCourseDropdown = false,
  cancelButton = true,
  onCancel = () => {},
  allProfs,
}: CourseReviewBoxContentProps) => {
  const theme: DefaultTheme = useTheme();

  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number>(
    initialSelectedCourseIndex,
  );

  useEffect(() => {
    setSelectedCourseIndex(initialSelectedCourseIndex);
  }, [initialSelectedCourseIndex]);

  const buildDefaultReview = (
    course: Course,
    review: Review | null,
  ): ReviewState => {
    // We need to merge profs currently teaching the course and previous profs for the course with a review
    let profsTeaching: ProfTeaching[] = course.profs_teaching;

    if (profsTeachingByCourseId) {
      mergeInNewProfsTeaching(
        profsTeaching,
        profsTeachingByCourseId[course.id],
      );
    }

    profsTeaching = profsTeaching.filter(
      (prof: ProfTeaching) => prof.prof !== null,
    );
    // add prof to dropdown if not fetched from backend
    if (review) {
      const profExists = profsTeaching.some(
        (prof: ProfTeaching) => prof.prof && prof.prof.id === review.prof_id,
      );
      if (!profExists && review.prof_id !== null && review.prof) {
        profsTeaching.push({ prof: review.prof });
      }
    }

    profsTeaching = profsTeaching.sort((a: ProfTeaching, b: ProfTeaching) =>
      a.prof.name.localeCompare(b.prof.name),
    );

    const profIndex: number = getProfIndex(review, profsTeaching);

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
  const [deleteReviewModalOpen, setDeleteReviewModalOpen] = useState<boolean>(
    false,
  );
  const [reviewUpdating, setReviewUpdating] = useState<boolean>(false);
  const [reviewDeleting, setReviewDeleting] = useState<boolean>(false);

  const [reviewStates, setReviewStates] = useState<ReviewStates>(
    courseList.reduce(
      (
        states: ReviewStates,
        { course, review }: { course: Course; review: Review | null },
      ) => {
        states[course.code] = buildDefaultReview(course, review);
        return states;
      },
      {},
    ),
  );
  const [
    lastRenderProfsTeaching,
    setLastRenderProfsTeaching,
  ] = useState<ProfTeachingMap | null>(profsTeachingByCourseId);

  const userId: number = getUserId();
  const { course, review }: CourseListItem = courseList[selectedCourseIndex];

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
  }: ReviewState = reviewStates[course.code];

  /* Effects */
  useEffect(() => {
    if (!profsTeachingByCourseId) return;
    // update state if profsTeaching changes
    if (!_.isEqual(profsTeachingByCourseId, lastRenderProfsTeaching)) {
      const newReviewStates: ReviewStates = _.cloneDeep(reviewStates);
      Object.keys(reviewStates).forEach((code: string) => {
        mergeInNewProfsTeaching(
          newReviewStates[code].profsTeaching,
          profsTeachingByCourseId[reviewStates[code].id],
        );
        newReviewStates[code].profsTeaching = newReviewStates[
          code
        ].profsTeaching.sort((a: ProfTeaching, b: ProfTeaching) =>
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
  const refetchQueries: Array<{
    query: DocumentNode;
    variables:
      | RefetchRatingsQueryVariables
      | RefetchCourseReviewsQueryVariables
      | CourseReviewsWithUserDataQueryVariables
      | RefetchUserReviewQueryVariables;
  }> = [
    {
      query: REFETCH_RATINGS,
      variables: {
        course_id: course.id,
        prof_id: review && review.prof_id ? review.prof_id : -1,
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

  const [upsertReview] = useMutation<
    UpsertReviewMutation,
    UpsertReviewMutationVariables
  >(UPSERT_REVIEW, {
    refetchQueries,
    awaitRefetchQueries: true,
  });

  const [deleteReview] = useMutation<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >(DELETE_REVIEW, {
    refetchQueries,
    awaitRefetchQueries: true,
  });

  const notifyDelete = () => toast(REVIEW_SUCCESS.deleted);
  const notifyInsert = () => toast(REVIEW_SUCCESS.posted);
  const notifyUpdate = () => toast(REVIEW_SUCCESS.updated);

  const profOptions: ProfOption[] = [
    { label: "My Professor Isn't Here", id: null },
    ...profsTeaching
      .sort((a: ProfTeaching, b: ProfTeaching) =>
        a.prof.name.localeCompare(b.prof.name),
      )
      .map((profObj: ProfTeaching) => ({
        label: profObj.prof.name,
        id: profObj.prof.id,
      })),
    ...filterTeachingProfs(allProfs, profsTeaching).map((prof: Prof) => ({
      label: prof.name,
      id: prof.id,
    })),
  ];

  const handlePost = () => {
    setReviewUpdating(true);

    const reviewData: UpsertReviewMutationVariables = {
      user_id: userId,
      course_id: course.id,
      prof_id: profOptions[selectedProf]?.id ?? null,
      liked: 1 - liked,
      public: selectedAnonymous !== 0,
      course_easy: easy,
      course_useful: useful,
      course_comment: courseComment !== '' ? courseComment : null,
      prof_clear: profOptions[selectedProf]?.id && clearSelected ? clear : null,
      prof_engaging:
        profOptions[selectedProf]?.id && engagingSelected ? engaging : null,
      prof_comment:
        profOptions[selectedProf]?.id && profComment !== ''
          ? profComment
          : null,
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
              id: review ? review.id : 0,
              ...reviewData,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              public: Boolean(selectedAnonymous !== 0),
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

  const setReviewValue = (
    key: keyof ReviewState,
    value: ReviewState[keyof ReviewState],
  ) => {
    setReviewStates({
      ...reviewStates,
      [course.code]: {
        ...reviewStates[course.code],
        [key]: value,
      },
    });
  };

  const setSliderValue = (
    key: keyof ReviewState,
    value: ReviewState[keyof ReviewState],
    selectedKey: keyof ReviewState,
  ) => {
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
            options={courseList.map((courseObj: CourseListItem) =>
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
          onSlideEnd={(value: readonly number[]) =>
            setSliderValue('useful', value[0], 'usefulSelected')
          }
          selected={usefulSelected}
          setSelected={(value: boolean) =>
            setReviewValue('usefulSelected', value)
          }
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
          onSlideEnd={(value: readonly number[]) =>
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
          options={profOptions.map((p) => p.label)}
          color={theme.professors}
          onChange={(value) => setReviewValue('selectedProf', value)}
          zIndex={5}
          maxItems={4}
          width={230}
          searchable
        />
      </QuestionWrapper>

      <Collapsible
        open={selectedProf !== -1 && selectedProf !== 0}
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
            onSlideEnd={(value: readonly number[]) =>
              setSliderValue('clear', value[0], 'clearSelected')
            }
            selected={clearSelected}
            setSelected={(value: boolean) =>
              setReviewValue('clearSelected', value)
            }
            disabled={profOptions[selectedProf]?.id === null}
          />
          <SliderOptionText>
            {clearSelected && profOptions[selectedProf]?.id !== null
              ? CLEAR_OPTIONS[clear]
              : ''}
          </SliderOptionText>
        </MetricQuestionWrapper>

        <MetricQuestionWrapper>
          <MetricQuestionText>Engaging?</MetricQuestionText>
          <DiscreteSlider
            numNodes={5}
            currentNode={engaging}
            color={theme.professors}
            onSlideEnd={(value: readonly number[]) =>
              setSliderValue('engaging', value[0], 'engagingSelected')
            }
            selected={engagingSelected}
            setSelected={(value: boolean) =>
              setReviewValue('engagingSelected', value)
            }
            disabled={profOptions[selectedProf]?.id === null}
          />
          <SliderOptionText>
            {engagingSelected && profOptions[selectedProf]?.id !== null
              ? ENGAGING_OPTIONS[engaging]
              : ''}
          </SliderOptionText>
        </MetricQuestionWrapper>

        <ReviewTextArea
          rows={5}
          value={profComment}
          maxLength={8192}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setReviewValue('profComment', event.target.value)
          }
          placeholder="Add any comments or tips..."
          disabled={profOptions[selectedProf]?.id === null}
        />
      </Collapsible>
      <Footer>
        <DeleteIconWrapper
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
            e.preventDefault()
          }
        >
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
            onChange={(value: number) =>
              setReviewValue('selectedAnonymous', value)
            }
            margin="auto 16px auto auto"
            zIndex={2}
            width={140}
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

const CourseReviewBox = ({ courseList, ...props }: CourseReviewBoxProps) => {
  const courseIds = courseList.map((course) => course.course.id);
  const { data: profsData } = useQuery<CourseReviewProfsQuery>(
    COURSE_REVIEW_PROFS,
    {
      variables: { id: courseIds },
    },
  );

  // Add new query for all professors
  const { data: allProfsData } = useQuery(ONLY_PROF_QUERY);

  const profsSeenByCourseID: { [key: string]: { [key: string]: boolean } } = {};
  const profsTeachingByCourseId = profsData
    ? profsData.review.reduce<{ [key: string]: ProfTeaching[] }>(
        (profs, currentProf) => {
          if (
            currentProf &&
            currentProf.prof &&
            currentProf.course_id &&
            (!profsSeenByCourseID[currentProf.course_id] ||
              !profsSeenByCourseID[currentProf.course_id]?.[
                currentProf.prof.code
              ])
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
        },
        {},
      )
    : null;

  return (
    <CourseReviewBoxContent
      {...{
        ...props,
        profsTeachingByCourseId,
        courseList,
        allProfs: allProfsData?.prof || [],
      }}
    />
  );
};

export default CourseReviewBox;
