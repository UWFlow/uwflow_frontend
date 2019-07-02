import styled from 'styled-components';

/* Constants */
import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

/* Mixins */
import { Heading1, Body } from '../../../../constants/Mixins';

export const ProfInfoBoxWrapper = styled.div`
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
`;

export const ProfPicture = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.dark3};
`;

export const ProfInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfName = styled.div`
  ${Heading1}
`;

export const CoursesTaughtWrapper = styled.div`
  color: ${({ theme }) => theme.dark3};
  ${Body}
`;

export const RatingsSection = styled.div`
  width: 50%;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-content: middle;
`;
