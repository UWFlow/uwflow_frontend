import styled from 'styled-components';
import { BoxShadow, Heading4, Body } from '../../../../constants/Mixins';

export const CourseReviewCourseBoxWrapper = styled.div`
  ${BoxShadow}
  background-color: white;
  margin-bottom: 32px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

export const QuestionText = styled.div`
  ${Heading4}
`;

export const ReviewTextArea = styled.textarea`
  padding: 8px 16px;
  background: ${({theme}) => theme.light2};
  margin: 40px 0;
  border-radius: 4px;
  outline: none;
  border: none;
  height: 88px;
  resize: none;
`;

export const MetricQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MetricQuestionText = styled.div`
  ${Body}
`;

export const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

export const Footer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
`;

export const FooterQuestionWrapper = styled.div`
  right: 0;
  display: flex;
  align-items: center;
`;
