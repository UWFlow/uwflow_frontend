import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Body, Link } from '../../../constants/Mixins';

export const ShortlistCourse = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  padding: 16px 32px;
  border-top: 1px solid ${({theme}) => theme.light3};
`;

export const ShortListCourseText = styled.div`
  display: block;
  margin-left: 16px;
`;

export const ShortlistCourseCode = styled(RouterLink)`
  ${Link}
  font-size: 18px;
  color: ${({theme}) => theme.courses};
`;

export const ShortlistCourseName = styled.div`
  ${Body}
  color: ${({theme}) => theme.dark2};
  margin-top: 4px;
`;
