import React, { useState } from 'react';
import { Trash2 } from 'react-feather';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { useMutation } from 'react-apollo';

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
  DeleteConfirmButtons
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
import {
  DELETE_REVIEW,
  INSERT_COURSE_REVIEW,
  INSERT_PROF_REVIEW,
  UPDATE_COURSE_REVIEW,
  UPDATE_PROF_REVIEW
} from '../../graphql/mutations/user/Review';
import {
  COURSE_REVIEW_REFETCH_QUERY,
  PROF_REVIEW_REFETCH_QUERY
} from '../../graphql/queries/course/Course';

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
  const { course, courseReview, profReview } = courseList[selectedCourseIndex];
  let profsTeaching = course.profs_teaching;
  profsTeaching = profsTeaching.filter(prof => prof.prof !== null);

  // add prof to dropdown if not fetched from backend
  if (profReview) {
    let idx = profsTeaching.findIndex(prof => prof.prof && prof.prof.id === profReview.prof.id);
    if (idx === -1) {
      profsTeaching.push({ prof: profReview.prof });
    }
  }

  const profIndex = profReview ? 
    profsTeaching.findIndex(prof => prof.prof && prof.prof.id === profReview.prof.id) : -1;

  /* State */
  const [deleteReviewModalOpen, setDeleteReviewModalOpen] = useState(false);

  const [useful, setUseful] = useState((courseReview && courseReview.useful) || -1);
  const [easy, setEasy] = useState((courseReview && courseReview.easy) || -1);
  const [liked, setLiked] = useState(courseReview ?
    (courseReview.liked !== null ? 1 - courseReview.liked : -1) : -1);
  const [courseReviewText, setCourseReviewText] = useState((courseReview && courseReview.text) || '');

  const [clear, setClear] = useState((profReview && profReview.clear) || -1);
  const [engaging, setEngaging] = useState((profReview && profReview.engaging) || -1);
  const [profReviewText, setProfReviewText] = useState((profReview && profReview.text) || '');

  const [selectedProf, setSelectedProf] = useState(profIndex);
  const [selectedAnonymous, setSelectedAnonymous] = useState(courseReview && courseReview.public ? 1 : 0);

  /* Mutations */
  const refetchCourseReview = {
    query: COURSE_REVIEW_REFETCH_QUERY,
    variables: { course_id: course.id, user_id: userID }
  };

  const refetchProfReview = {
    query: PROF_REVIEW_REFETCH_QUERY,
    variables: { course_id: course.id, user_id: userID }
  };

  const [deleteReview] = useMutation(DELETE_REVIEW, { refetchQueries: [refetchCourseReview, refetchProfReview] });
  const [insertCourseReview] = useMutation(INSERT_COURSE_REVIEW, { refetchQueries: [refetchCourseReview] });
  const [insertProfReview] = useMutation(INSERT_PROF_REVIEW, { refetchQueries: [refetchProfReview] });
  const [updateCourseReview] = useMutation(UPDATE_COURSE_REVIEW, { refetchQueries: [refetchCourseReview] });
  const [updateProfReview] = useMutation(UPDATE_PROF_REVIEW, { refetchQueries: [refetchProfReview] });

  return (
    <CourseReviewCourseBoxWrapper>
      {(courseList.length > 1 || showCourseDropdown) && (
        <QuestionWrapper>
          <QuestionText>Review a course: </QuestionText>
          <DropdownList
            selectedIndex={selectedCourseIndex}
            placeholder="select a course"
            options={courseList.map(courseObject => splitCourseCode(courseObject.course.code))}
            color={theme.courses}
            onChange={value => setSelectedCourseIndex(value)}
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
        value={courseReviewText}
        onChange={(value) => setCourseReviewText(value)}
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
        />
      </QuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Clear?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={clear}
          color={theme.professors}
          onUpdate={value => setClear(value[0])}
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
        />
        <SliderOptionText>{engagingOptions[engaging]}</SliderOptionText>
      </MetricQuestionWrapper>
      <ReviewTextArea
        rows={5}
        value={profReviewText}
        onChange={(value) => setProfReviewText(value)}
        placeholder="Add any comments or tips..."
      />
      <Footer>
        <DeleteIconWrapper>
          <Trash2 onClick={() => setDeleteReviewModalOpen(true)} color={theme.red} />
        </DeleteIconWrapper>
        <FooterQuestionWrapper>
          <QuestionText>Post: </QuestionText>
          <DropdownList
            selectedIndex={selectedAnonymous}
            options={['anonymously', 'as yourself']}
            color={theme.primary}
            onChange={value => setSelectedAnonymous(value)}
            margin="auto 16px auto auto"
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
          <Button children="Post" />
        </FooterQuestionWrapper>
      </Footer>
      <Modal isOpen={deleteReviewModalOpen} onRequestClose={() => setDeleteReviewModalOpen(false)}>
        <DeleteReviewModalWrapper>
          Are you sure you want to delete this review?
          <DeleteConfirmButtons>
            <Button
              color={theme.dark3}
              hoverColor={theme.dark2}
              margin="auto 16px auto 0"
              handleClick={() => setDeleteReviewModalOpen(false)}
            >
              <LightText>Cancel</LightText>
            </Button>
            <Button
              color={theme.red}
              hoverColor={theme.darkRed}
            >
              <LightText
                onClick={() => {
                  deleteReview({variables: {
                    course_review_id: courseReview ? courseReview.id : null,
                    prof_review_id: profReview ? profReview.id : null
                  }}).then(() => {
                    onCancel();
                  }).catch(() => {
                    onCancel();
                  });
                }}
              >
                Delete
              </LightText>
            </Button>
          </DeleteConfirmButtons>
        </DeleteReviewModalWrapper>
      </Modal>
    </CourseReviewCourseBoxWrapper>
  );
};

CourseReviewCourseBox.propTypes = {
  courseList: PropTypes.arrayOf(PropTypes.shape({
    course: PropTypes.object.isRequired,
    courseReview: PropTypes.object,
    profReview: PropTypes.object,
  })).isRequired,
  theme: PropTypes.object.isRequired,
  selectedCourseIndex: PropTypes.number,
  setSelectedCourseIndex: PropTypes.func,
  showCourseDropdown: PropTypes.bool,
  cancelButton: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default withTheme(CourseReviewCourseBox);
