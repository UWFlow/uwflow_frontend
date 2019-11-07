import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import CourseHeader from '../../../img/course_v1.svg';

/* Mixins */
import {
  Heading1,
  Heading2,
  Body,
  PageContent,
} from '../../../constants/Mixins';

export const CourseInfoHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  background-color: white;
  flex-direction: column;
  position: relative;
`;

export const CourseCodeAndNameSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.primaryExtraDark};
  background: url(${CourseHeader});
  background-size: cover;
  position: relative;
  min-height: 162px;
  padding: 16px;

  ${breakpoint('tablet')`
    min-height: 320px;
    padding-bottom: 48px;
    padding-left: 32px;
  `}
`;

export const CourseCodeAndStar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const StarAlignmentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${breakpoint('tablet')`
    margin-left: 16px;
  `}
`;

export const CourseCode = styled.div`
  ${Heading1}
  color: white;
  text-transform: uppercase;

  ${breakpoint('mobile', 'tablet')`
    margin-right: 16px;
  `}

  ${breakpoint('tablet')`
    max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  `}
`;

export const CourseName = styled.div`
  ${Heading2}
  color: ${({ theme }) => theme.light1};
  font-weight: 400;

  ${breakpoint('tablet')`
    max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  `}
`;

export const CourseDescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  ${breakpoint('tablet')`
    ${PageContent}
    padding-bottom: 48px;
    margin: auto;
  `}
`;

export const Description = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark1};

  ${breakpoint('mobile', 'tablet')`
    margin-bottom: 16px;
  `}

  ${breakpoint('tablet')`
    margin-top: 48px;
    max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
    line-height: 1.5;
  `}
`;

export const RatingsSection = styled.div`
  ${breakpoint('mobile', 'tablet')`
    width: 100%;
  `}

  ${breakpoint('tablet')`
    position: absolute;
    right: 0;
    bottom: 32px;
  `}
`;
