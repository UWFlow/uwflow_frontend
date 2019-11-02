import styled from 'styled-components';

/* Mixins */
import { Heading1, Heading2 } from '../../../../constants/Mixins';

export const ProfileInfoHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  background-color: ${({ theme }) => theme.primaryExtraDark};
  flex-direction: column;
  position: relative;
`;

export const ProfileInfoSection = styled.div`
  padding: 16px;
  position: relative;
`;

export const UserPicture = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.light1};
  margin-bottom: 16px;
  object-fit: cover;
`;

export const UserName = styled.div`
  ${Heading1}
  color: ${({ theme }) => theme.white};
  margin-bottom: ${({ hasProgram }) => hasProgram ? '16px' : '0'};
`;

export const UserProgram = styled.div`
  ${Heading2}
  color: ${({ theme }) => theme.light1};
  font-weight: 400;
`;
