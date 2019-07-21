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
  margin-bottom: 40px;
`;

export const ReviewTextArea = styled.input`
  padding: 8px 16px;
  background: ${({theme}) => theme.light2};
  margin: 40px 0;
  border-radius: 4px;
  outline: none;
  border: none;
`;

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
