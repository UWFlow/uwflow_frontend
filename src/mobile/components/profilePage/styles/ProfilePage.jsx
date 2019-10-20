import styled from 'styled-components';
import { BoxShadow } from '../../../../constants/Mixins';

export const ProfilePageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.light1};
`;

export const CompleteProfileWrapper = styled.div`
  width: 100%;
  padding: 24px 16px;
  padding-bottom: 0;
  margin-bottom: 32px;
  background-color: ${({theme}) => theme.white};
  ${BoxShadow}  
`;
