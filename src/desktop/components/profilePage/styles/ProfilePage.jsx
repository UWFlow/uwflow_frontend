import styled from 'styled-components';
import { WideColumn, ThinColumn, PageContent, BoxShadow } from '../../../../constants/Mixins';

export const ProfilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`;

export const ColumnWrapper = styled.div`
  ${PageContent}
  margin: auto;
  display: flex;
`;

export const Column1 = styled.div`
  ${WideColumn}
`;

export const Column2 = styled.div`
  ${ThinColumn}
`;

export const CompleteProfileWrapper = styled.div`
  width: 100%;
  padding: 32px;
  padding-bottom: 0;
  margin-bottom: 32px;
  border-radius: 4px;
  background-color: ${({theme}) => theme.white};
  ${BoxShadow}  
`;
