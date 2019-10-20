import styled from 'styled-components';

/* Mixins */
import { Heading1, Heading2 } from '../../../../constants/Mixins';

export const CourseInfoHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: white;
`;

export const CourseNameSection = styled.div`
  width: 100%;
  min-height: 162px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.primary};
  position: relative;
  padding: 16px;
`;

export const CourseCodeAndStar = styled.div`
  display: flex;
  align-items: center;
`;

export const StarAlignmentWrapper = styled.div`
  position: relative;
  bottom: 1px;
`;

export const CourseCode = styled.div`
  ${Heading1}
  color: ${({ theme }) => theme.white};;
  margin-right: 16px;
  margin-bottom: 16px;
`;

export const CourseName = styled.div`
  ${Heading2}
  color: ${({ theme }) => theme.light1};
  font-weight: 400;
`;
