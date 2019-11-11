import styled from 'styled-components';
import ProfileHeader from '../../../img/user_v1.svg';

/* Mixins */
import { Heading1, PageContent, Heading2 } from '../../../constants/Mixins';

export const ProfileInfoHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  background-color: ${({ theme }) => theme.primaryExtraDark};
  background: url(${ProfileHeader});
  background-size: cover;
  flex-direction: column;
  position: relative;
`;

export const ProfileInfoSection = styled.div`
  padding: 52px 0;
  ${PageContent}
  min-height: 320px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
  position: relative;
`;

export const UserPicture = styled.img`
  width: 208px;
  height: 208px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.light1};
  margin-right: 32px;
  object-fit: cover;
`;

export const UserInfoWrapper = styled.div`
  margin: 48px 0;
`;

export const UserName = styled.div`
  ${Heading1}
  color: ${({ theme }) => theme.white};
  margin-bottom: 16px;
`;

export const UserProgram = styled.div`
  ${Heading2}
  color: ${({ theme }) => theme.light1};
  font-weight: 400;
`;
