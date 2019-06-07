import styled from 'styled-components';
import { WideColumn, ThinColumn } from '../../../../constants/Mixins';
import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

export const ProfilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.light1};
`;

export const ColumnWrapper = styled.div`
  display: flex;
  width: ${PAGE_CONTENT_WIDTH}px;
  margin: auto;
`;

export const Column1 = styled.div`
  ${WideColumn}
`;

export const Column2 = styled.div`
  ${ThinColumn}
`;

export const UserCoursesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserCoursesHeader = styled.div`
  display: flex;
`;
