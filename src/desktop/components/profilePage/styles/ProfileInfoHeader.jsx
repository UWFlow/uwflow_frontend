import styled from 'styled-components';

/* Mixins */
import { Heading1, Heading2 } from '../../../../constants/Mixins';

/* Constants */
import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

export const ProfileInfoHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  background-color: white;
  flex-direction: column;
  position: relative;
`;

export const ProfileInfoSection = styled.div`
  width: 100%;
  max-width: ${PAGE_CONTENT_WIDTH};
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.primary};
  position: relative;
`;

export const UserPictureWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 200px;
`;

export const UserPicture = styled.img`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 200px;
`;

export const UserName = styled.div`
  color: white;
  ${Heading1};
  margin-bottom: 16px;
`;

export const UserProgram = styled.div`
  color: white;
  ${Heading2};
`;
