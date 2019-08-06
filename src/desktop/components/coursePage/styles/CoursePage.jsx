import styled from 'styled-components';
import { PageContent } from '../../../../constants/Mixins';

/* Mixins */
import {
  WideColumn,
  ThinColumn,
  BoxShadow,
  Heading3,
  Heading4,
} from '../../../../constants/Mixins';

export const CoursePageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
`;

export const ColumnWrapper = styled.div`
  ${PageContent}
  margin: auto;
  display: flex;
`;

export const Column1 = styled.div`
  ${WideColumn}
`;

export const Column2 = styled.div`
  ${ThinColumn}
`;

export const ExtraInfoBoxWrapper = styled.div`
  width: 100%;
  background-color: white;
  border: 2px solid ${({ theme }) => theme.light2};
  ${BoxShadow}
  padding: 16px;
  ${Heading4}
`;

export const CourseReviewQuestionBox = styled.div`
  display: flex;
  width: 100%;
  ${BoxShadow}
  justify-content: space-between;
  padding: 24px;
  align-items: center;
  background: white;
  margin-bottom: 32px;
  border-radius: 5px;
`;

export const CourseReviewQuestionText = styled.div`
  ${Heading3}
`;

export const AddReviewButton = styled.div`
  background-color: ${({ theme }) => theme.accent} ${Heading3};
  padding: 8px 24px 8px 24px;
  border-radius: 5px;
  cursor: pointer;
`;
