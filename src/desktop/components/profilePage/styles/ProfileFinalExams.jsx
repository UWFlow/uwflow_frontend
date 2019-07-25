import styled from 'styled-components';
import { BoxShadow, Heading2, Body, Link } from '../../../../constants/Mixins';

export const ProfileFinalExamsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.white};
  padding: 24px 32px;
  ${BoxShadow}
`;

export const ProfileFinalExamsHeader = styled.div`
  ${Heading2}
  color: ${({ theme }) => theme.dark1};
`;

export const LastUpdatedText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark3};
  margin-bottom: 32px;
`;

export const LastUpdatedLink = styled.a`
  ${Link}
  text-decoration: underline;
  color: ${({ theme }) => theme.dark3};
`;
