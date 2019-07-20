import React from 'react';
import {
  CourseReviewCourseBoxWrapper,
  QuestionText,
  MetricQuestionWrapper,
  MetricQuestionText,
  ReviewTextArea,
  RateProfessorWrapper,
  Footer,
} from './styles/CourseReviewCourseBox';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* Child Components */
import DiscreteSlider from '../common/discreteSlider/DiscreteSlider';
import RadioButton from '../common/RadioButton';
import DropdownList from '../common/dropdownList/DropdownList';
import Button from '../common/Button';

const easyOptions = [
  'Very difficult', 'Difficult', 'Somewhat difficult',
  'Somewhat easy', 'Easy', 'Very easy'
];

const usefulOptions = [
  'Very useless', 'Useless', 'Somewhat useless',
  'Somewhat useful', 'Useful', 'Very useful'
];

const clearOptions = [
  'Very unclear', 'Unclear', 'Somewhat unclear',
  'Somewhat clear', 'Clear', 'Very clear'
];

const engagingOptions = [
  'Very unengaging', 'Unengaging', 'Somewhat unengaging',
  'Somewhat engaging', 'Engaging', 'Very engaging'
];

const CourseReviewCourseBox = ({ courseID, onCancel, theme }) => {
  return (
    <CourseReviewCourseBoxWrapper>
      <QuestionText>What do you think of this course?</QuestionText>
      <MetricQuestionWrapper>
        <DiscreteSlider
          title="Useful?"
          numNodes={6}
          currentNode={0}
          nodeText={usefulOptions}
          color={theme.courses}
        />
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <DiscreteSlider
          title="Easy?"
          numNodes={6}
          currentNode={0}
          nodeText={easyOptions}
          color={theme.courses}
        />
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Like it? </MetricQuestionText>
        <RadioButton selected={true} />
        <MetricQuestionText>Yes</MetricQuestionText>
        <RadioButton selected={false} />
        <MetricQuestionText>Yes</MetricQuestionText>
      </MetricQuestionWrapper>

      <ReviewTextArea rows={5} placeholder="Add any comments or tips" />

      <RateProfessorWrapper>
        <QuestionText>Rate your professor: </QuestionText>
        <DropdownList
          selectedIndex={0}
          list={['select your professor']}
          color={theme.professors}
        />
      </RateProfessorWrapper>

      <MetricQuestionWrapper>
        <DiscreteSlider
          title="Clear?"
          numNodes={6}
          currentNode={0}
          nodeText={clearOptions}
          color={theme.professors}
        />
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <DiscreteSlider
          title="Engaging?"
          numNodes={6}
          currentNode={0}
          nodeText={engagingOptions}
          color={theme.professors}
          margin="0"
        />
      </MetricQuestionWrapper>

      <ReviewTextArea rows={5} placeholder="Add any comments or tips" />

      <Footer>
        <Button children="Cancel" handleClick={onCancel} />
        <MetricQuestionWrapper>
          <MetricQuestionText>Post: </MetricQuestionText>
          <DropdownList
            selectedIndex={0}
            list={['anonymously']}
            color={theme.primary}
          />
        </MetricQuestionWrapper>
        <Button children="Post" />
      </Footer>
    </CourseReviewCourseBoxWrapper>
  );
};

CourseReviewCourseBox.propTypes = {
  courseID: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(CourseReviewCourseBox);
