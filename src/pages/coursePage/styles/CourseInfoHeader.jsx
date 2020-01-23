import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import CourseHeader from '../../../img/course.svg';
import FadeIn from 'react-fade-in';

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
  background-color: ${({ theme }) => theme.white};
  flex-direction: column;
  position: relative;
`;

export const CourseCodeAndNameSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: url(${CourseHeader});
  background-color: ${({ theme }) => theme.primaryExtraDark};
  background-size: cover;
  background-repeat: no-repeat;
  will-change: transform;
  position: relative;
  min-height: 160px;
  padding: 16px;

  ${breakpoint('tablet')`
    min-height: 320px;
  `}
`;

export const CourseCodeAndStar = styled.div`
  display: flex;
  align-items: flex-start;

  ${breakpoint('tablet')`
    ${PageContent}
    margin: 0 auto;
  `}
`;

export const StarAlignmentWrapper = styled(FadeIn)`
  display: flex;
  flex-direction: column;
  margin-top: 3px;

  ${breakpoint('tablet')`
    margin-left: 16px;
  `}
`;

export const CourseCode = styled(FadeIn)`
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

export const CourseNameWrapper = styled(FadeIn)`
  ${breakpoint('tablet')`
    ${PageContent}
    margin: 16px auto 0 auto;
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
  padding: 0;
  position: relative;

  ${breakpoint('tablet')`
    ${PageContent}
    padding-bottom: 48px;
    margin: auto;
  `}
`;

export const Description = styled(FadeIn)`
  ${Body}
  font-weight: 500;
  color: ${({ theme }) => theme.dark2};
  line-height: 1.5;

  ${breakpoint('mobile', 'tablet')`
    margin-bottom: 16px;
    padding: 0 16px;
    min-width: 100%;
  `}

  ${breakpoint('tablet')`
    margin-top: 48px;
    max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  `}
`;

export const RatingsSection = styled(FadeIn)`
  ${breakpoint('mobile', 'tablet')`
    width: 100%;
  `}

  ${breakpoint('tablet')`
    position: absolute;
    right: 0;
    bottom: 32px;
  `}
`;
