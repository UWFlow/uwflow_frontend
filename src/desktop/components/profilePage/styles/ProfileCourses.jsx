import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Heading1, Body, Link } from '../../../../constants/Mixins';

export const ProfileCoursesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 32px;
  border-radius: 4px;
`;

export const ProfileCoursesCourse = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px 32px;
  border-bottom: 1px solid ${({theme}) => theme.light3};

  &:last-child {
    border: none;
  }
`;

export const ProfileCourseText = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 32px;
  width: 100%;
`;

export const ProfileCourseCode = styled(RouterLink)`
  ${Link}
  font-size: 18px;
  color: ${({theme}) => theme.courses};
  margin: auto 0;
`;

export const ProfileCourseName = styled.div`
  ${Body}
  color: ${({theme}) => theme.dark2};
  margin: auto 0;
`;

export const ProfileCourseLiked = styled.div`
  ${Heading1}
  font-size: 36px;
  color: ${({theme}) => theme.dark2};
  margin-right: 16px;
`;

export const LikedThisCourseText = styled.div`
  ${Body}
  color: ${({theme}) => theme.dark3};
  margin-right: 16px;
  width: 100%;
  max-width: 64px;
  line-height: 140%;
`;
