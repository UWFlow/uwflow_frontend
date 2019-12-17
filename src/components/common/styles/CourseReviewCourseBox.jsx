import styled from 'styled-components';
import {
  Card,
  BoxShadow,
  Heading3,
  Heading4,
  Body,
} from '../../../constants/Mixins';

const MODAL_WIDTH = 660;

export const CourseReviewCourseBoxWrapper = styled.div`
  ${Card('24px', '32px 0')}
  ${BoxShadow}
  width: ${MODAL_WIDTH}px;
`;

export const QuestionText = styled.div`
  ${Heading4}
  white-space: nowrap;
`;

export const SliderOptionText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark2};
  font-weight: 600;
  margin-left: 40px;
  margin-bottom: 40px;
`;

export const ReviewTextArea = styled.textarea`
  padding: 8px 16px;
  background: ${({ theme }) => theme.light2};
  margin: 0 0 40px 0;
  border-radius: 4px;
  outline: none;
  border: none;
  height: ${({ rows }) => rows * 16}px;
  resize: none;
  ${BoxShadow}
  ${Body}
`;

export const MetricQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MetricQuestionText = styled.div`
  ${Body}
  width: ${({ width = 112 }) => width}px;
  min-width: ${({ width = 112 }) => width}px;
  margin-bottom: 40px;
  position: relative;
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
  align-items: center;
`;

export const DeleteIconWrapper = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 4px;
  border: 2px solid ${({ theme }) => theme.red};
  cursor: pointer;
`;

export const FooterQuestionWrapper = styled.div`
  right: 0;
  display: flex;
  align-items: center;
`;

export const LightText = styled.div`
  color: ${({ theme }) => theme.white};
  ${Heading4}
  font-weight: 400;
`;

export const DeleteReviewModalWrapper = styled.div`
  ${Card()}
  color: ${({ theme }) => theme.dark1};
  ${Heading3}
`;

export const DeleteConfirmButtons = styled.div`
  display: flex;
  margin-top: 16px;
`;
