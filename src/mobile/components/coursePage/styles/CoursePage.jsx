import styled from 'styled-components';
import { PageContent } from '../../../../constants/Mixins';

/* Mixins */
import {
  Card,
  WideColumn,
  ThinColumn,
  BoxShadow,
  Heading3,
  Heading4,
} from '../../../../constants/Mixins';

export const CoursePageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.light1};
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
  ${Card('24px')}
  ${BoxShadow}
  ${Heading4}
`;

export const CourseReviewQuestionBox = styled.div`
  ${Card('24px')}
  ${BoxShadow}
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
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