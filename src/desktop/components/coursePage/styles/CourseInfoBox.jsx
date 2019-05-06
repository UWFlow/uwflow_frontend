import styled from 'styled-components';

/* Constants */
import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

export const CourseInfoBoxWrapper = styled.div`
  width: ${PAGE_CONTENT_WIDTH}px;
  height: 300px;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  background-color: white;
`;

export const InfoSection = styled.div`
  width: 50%;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CourseCode = styled.div`
  color: ${({ theme }) => theme.dark3};
`;

export const CourseName = styled.div``;

export const Description = styled.div``;

export const RatingsSection = styled.div`
  width: 50%;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-content: middle;
`;
