import styled from 'styled-components';
import { Card, BoxShadow, Heading3 } from '../../../../constants/Mixins';

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

export const ProfileFinalExamsWrapper = styled.div`
  ${BoxShadow}
  margin-bottom: 32px;
  background-color: ${({theme}) => theme.white};
`;

export const ProfileFinalExamsHeader = styled.div`
  padding: 24px 16px;
  ${Heading3}
  color: ${({ theme }) => theme.dark1};
`;

export const ProfileFinalExamsContent = styled.div`
  overflow-x: auto;
`;