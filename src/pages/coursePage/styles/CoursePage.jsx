import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

/* Mixins */
import {
  PageContent,
  Card,
  WideColumn,
  ThinColumn,
  BoxShadow,
  Heading3,
  Heading4,
} from '../../../constants/Mixins';

export const CoursePageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ColumnWrapper = styled.div`
  ${PageContent}
  margin: auto;
  display: flex;
  flex-flow: row wrap;
`;

export const Column1 = styled.div`
  ${WideColumn}

  ${breakpoint('mobile', 'tablet')`
    width: 100%;
    padding: 0;
    order: 2;
  `}
`;

export const Column2 = styled.div`
  ${ThinColumn}

  ${breakpoint('mobile', 'tablet')`
    width: 100%;
    order: 1;
  `}
`;

export const ExtraInfoBoxWrapper = styled.div`
  ${Card('32px 24px')}
  ${BoxShadow}
  ${Heading4}
  margin-bottom: 32px;
`;

export const ScheduleAndReviewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CourseReviewQuestionBox = styled.div`
  ${Card('24px')}
  ${BoxShadow}
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const CourseQuestionTextAndToggle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

export const CourseReviewQuestionText = styled.div`
  ${Heading3}
  margin-right: 24px;
`;

export const AddReviewButton = styled.div`
  background-color: ${({ theme }) => theme.accent} ${Heading3};
  padding: 8px 24px 8px 24px;
  border-radius: 5px;
  cursor: pointer;
`;
