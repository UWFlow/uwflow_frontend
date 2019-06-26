import styled from 'styled-components';

/* Mixins */
import { Heading1, Body } from '../../../../constants/Mixins';

export const UserInfoBoxWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 240px;
  background: white;
`;

export const UserPicture = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.dark3};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  ${Heading1}
`;

export const UserProgram = styled.div`
  ${Body}
`;
