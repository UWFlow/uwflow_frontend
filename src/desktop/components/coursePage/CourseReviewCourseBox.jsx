import React, { useState } from 'react';
import {
  CourseReviewCourseBoxWrapper,
  QuestionText,
  MetricQuestionWrapper,
  MetricQuestionText,
  ReviewTextArea,
  QuestionWrapper,
  Footer,
  CancelButtonText,
  FooterQuestionWrapper
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
  const [useful, setUseful] = useState(0);
  const [easy, setEasy] = useState(0);
  const [liked, setLiked] = useState(-1);

  const [clear, setClear] = useState(0);
  const [engaging, setEngaging] = useState(0);

  const [selectedProf, setSelectedProf] = useState(-1);
  const [selectedAnonymous, setSelectedAnonymous] = useState(0);

  return (
    <CourseReviewCourseBoxWrapper>
      <QuestionWrapper>
        <QuestionText>What do you think of this course?</QuestionText>
      </QuestionWrapper>
      <MetricQuestionWrapper>
        <MetricQuestionText>Useful?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={useful}
          nodeText={usefulOptions}
          color={theme.courses}
          onUpdate={(value) => setUseful(value[0])}
        />
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Easy?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={easy}
          nodeText={easyOptions}
          color={theme.courses}
          onUpdate={(value) => setEasy(value[0])}
        />
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText width={112 - 16}>Like it?</MetricQuestionText>
        <RadioButton
          selected={liked}
          options={['Yes', 'No']}
          color={theme.courses}
          onClick={(value) => setLiked(value)}
        />
      </MetricQuestionWrapper>

      <ReviewTextArea rows={5} placeholder="Add any comments or tips..." />

      <QuestionWrapper>
        <QuestionText>Rate your professor: </QuestionText>
        <DropdownList
          selectedIndex={selectedProf}
          placeholder='select your professor'
          options={['andrew kennings']} // TODO fetch professors
          color={theme.professors}
          onChange={(value) => setSelectedProf(value)}
        />
      </QuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Clear?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={clear}
          nodeText={clearOptions}
          color={theme.professors}
          onUpdate={(value) => setClear(value[0])}
        />
      </MetricQuestionWrapper>

      <MetricQuestionWrapper>
        <MetricQuestionText>Engaging?</MetricQuestionText>
        <DiscreteSlider
          numNodes={6}
          currentNode={engaging}
          nodeText={engagingOptions}
          color={theme.professors}
          onUpdate={(value) => setEngaging(value[0])}
        />
      </MetricQuestionWrapper>

      <ReviewTextArea rows={5} placeholder="Add any comments or tips..." />

      <Footer>
        <FooterQuestionWrapper>
          <QuestionText>Post: </QuestionText>
          <DropdownList
            selectedIndex={selectedAnonymous}
            options={['anonymously', 'as Derrek Chow']} // TODO use user name
            color={theme.primary}
            onChange={(value) => setSelectedAnonymous(value)}
            margin='auto 16px auto auto'
          />
          <Button
            children={<CancelButtonText>Cancel</CancelButtonText>}
            color={theme.dark3}
            hoverColor={theme.dark2}
            handleClick={onCancel}
            margin="auto 16px auto auto"
          />
          <Button children="Post" />
        </FooterQuestionWrapper>
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
