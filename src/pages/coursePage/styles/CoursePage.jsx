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
  PageWrapper,
} from '../../../constants/Mixins';

export const CoursePageWrapper = styled.div`
  ${PageWrapper}
`;

export const ColumnWrapper = styled.div`
  ${PageContent}
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

  ${breakpoint('mobile', 'tablet')`
    flex-direction: column;
  `}
`;

export const CourseQuestionTextAndToggle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  ${breakpoint('mobile', 'tablet')`
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
    justify-content: space-between;
  `}
`;

export const CourseReviewQuestionText = styled.div`
  ${Heading3}
  margin-right: 24px;

  ${breakpoint('mobile', 'tablet')`
    max-width: 60%;
  `}
`;
