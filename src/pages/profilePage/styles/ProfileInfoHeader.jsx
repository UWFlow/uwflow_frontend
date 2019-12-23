import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ProfileHeader from '../../../img/user_v1.svg';

/* Mixins */
import { Heading1, PageContent, Heading2 } from '../../../constants/Mixins';

/* Utils */
import { getKittenFromUserID } from '../../../utils/Kitten';

export const ProfileInfoHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  background-image: url(${ProfileHeader});
  background-color: ${({ theme }) => theme.primaryExtraDark};
  background-size: cover;
  flex-direction: column;
  position: relative;
`;

export const ProfileInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 32px 16px;

  ${breakpoint('tablet')`
    ${PageContent}
    padding: 52px 16px;
    flex-direction: row;
    align-items: center;
    min-height: 320px;
  `}
`;

export const UserPicture = styled.div`
  width: 208px;
  height: 208px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.light1};
  margin-right: 32px;
  object-fit: cover;
  background-image: ${({ id }) => `url(${getKittenFromUserID(id)})`};
  background-size: 208px;
  ${breakpoint('mobile', 'tablet')`
    width: 96px;
    height: 96px;
    background-size: 96px;
    margin-bottom: 16px;
  `};
`;

export const UserInfoWrapper = styled.div`
  margin: 48px 0;

  ${breakpoint('mobile', 'tablet')`
    margin: 0;
  `}
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
