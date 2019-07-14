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

const CourseReviewCourseBox = ({ courseID, onCancel, theme }) => {
  return (
    <CourseReviewCourseBoxWrapper>
      <QuestionText>What do you think of this course?</QuestionText>
      <MetricQuestionWrapper>
        <MetricQuestionText>Useful? </MetricQuestionText>
        <DiscreteSlider numNodes={6} currentNode={0} colour={theme.courses} />
        <MetricQuestionText>Very useful</MetricQuestionText>
      </MetricQuestionWrapper>
      <MetricQuestionWrapper>
        <MetricQuestionText>Easy? </MetricQuestionText>
        <DiscreteSlider numNodes={6} currentNode={0} colour={theme.courses} />
        <MetricQuestionText>Very easy</MetricQuestionText>
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
        <MetricQuestionText>Clear? </MetricQuestionText>
        <DiscreteSlider numNodes={6} currentNode={0} colour={theme.courses} />
        <MetricQuestionText>Very clear</MetricQuestionText>
      </MetricQuestionWrapper>
      <MetricQuestionWrapper>
        <MetricQuestionText>Engaging? </MetricQuestionText>
        <DiscreteSlider numNodes={6} currentNode={0} colour={theme.courses} />
        <MetricQuestionText>Very engaging</MetricQuestionText>
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
  courseID: PropTypes.string,
  onCancel: PropTypes.func,
  theme: PropTypes.object,
};

export default withTheme(CourseReviewCourseBox);
