import styled from 'styled-components';
import { WideColumn, ThinColumn } from '../../../../constants/Mixins';

export const ProfilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ColumnWrapper = styled.div`
  display: flex;
`;

export const Column1 = styled.div`
  ${WideColumn}
`;

export const Column2 = styled.div`
  ${ThinColumn}
`;

export const UserNameBoxWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const UserCoursesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserCoursesHeader = styled.div`
  display: flex;
`;
