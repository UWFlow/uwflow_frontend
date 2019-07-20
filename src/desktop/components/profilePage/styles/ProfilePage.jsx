import styled from 'styled-components';
import { WideColumn, ThinColumn } from '../../../../constants/Mixins';
import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

export const ProfilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding-bottom: 200px;
`;

export const ColumnWrapper = styled.div`
  width: 100%;
  max-width: ${PAGE_CONTENT_WIDTH}px;
  margin: auto;
  display: flex;
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
