import styled from 'styled-components';

/* Mixins */
import { Heading1, Heading2, Body, PageContent } from '../../../../constants/Mixins';

export const CourseInfoHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  background-color: white;
  flex-direction: column;
  position: relative;
`;

export const CourseCodeAndNameSection = styled.div`
  width: 100%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.primary};
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
  height: 200px;
  margin: auto;
`;

export const CourseCode = styled.div`
  color: ${({ theme }) => theme.light2};
  ${Heading1};
  margin-bottom: 16px;
  text-transform: uppercase;
  max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
`;

export const CourseName = styled.div`
  color: ${({ theme }) => theme.light3};
  max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  ${Heading2};
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
  bottom: ${({ ratingBoxHeight }) => 200 - ratingBoxHeight / 2}px;
`;
