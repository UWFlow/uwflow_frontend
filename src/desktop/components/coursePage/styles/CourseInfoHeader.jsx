import styled from 'styled-components';
import CourseHeader from '../../../../img/course_v1.svg';

/* Mixins */
import {
  Heading1,
  Heading2,
  Body,
  PageContent,
} from '../../../../constants/Mixins';

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
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.primaryExtraDark};
  background: url(${CourseHeader});
  background-size: cover;
  position: relative;
`;

export const CourseCodeAndNameWrapper = styled.div`
  ${PageContent}
  margin: auto;
  margin-bottom: 48px;
`;

export const CourseDescriptionSection = styled.div`
  position: relative;
  ${PageContent}
  padding-bottom: 48px;
  margin: auto;
`;

export const CourseCode = styled.div`
  color: ${({ theme }) => theme.white};
  ${Heading1};
  text-transform: uppercase;
  max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
`;

export const CourseName = styled.div`
  color: ${({ theme }) => theme.light1};
  max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  ${Heading2};
  font-weight: 400;
`;

export const Description = styled.div`
  ${Body}
  margin-top: 48px;
  max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  line-height: 1.5;
  color: ${({ theme }) => theme.dark1};
`;

export const RatingsSection = styled.div`
  position: absolute;
  right: 0;
  bottom: 32px;
`;

export const CourseCodeAndStar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const StarAlignmentWrapper = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
`;
