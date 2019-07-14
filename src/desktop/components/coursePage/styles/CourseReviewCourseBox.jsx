import styled from 'styled-components';
import { BoxShadow, Heading3, Body } from '../../../../constants/Mixins';

export const CourseReviewCourseBoxWrapper = styled.div`
  ${BoxShadow}
  background-color: white;
  margin-bottom: 32px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

export const QuestionText = styled.div`
  ${Heading3}
`;

export const ReviewTextArea = styled.textarea``;

export const MetricQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MetricQuestionText = styled.div`
  ${Body}
`;

export const RateProfessorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Footer = styled.div`
  display: flex;
`;
